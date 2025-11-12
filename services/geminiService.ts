
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Scenario, Decision, Industry, GameHistory, Difficulty, SCORProcess } from "../types";
import { PREDEFINED_SCENARIOS } from "../data/scenarios";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const scenarioSchema = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: "A detailed description of the supply chain risk scenario.",
    },
    options: {
      type: Type.ARRAY,
      description: "An array of three distinct, plausible response actions for the student.",
      items: { type: Type.STRING },
    },
    difficulty: {
        type: Type.STRING,
        description: "The difficulty of the scenario. Must be one of: Easy, Medium, Hard."
    },
    analysis: {
      type: Type.OBJECT,
      properties: {
        affectedProcess: {
          type: Type.STRING,
          description: "The SCOR process most affected. Must be one of: Plan, Source, Make, Deliver, Return, Enable.",
        },
        riskType: {
          type: Type.STRING,
          description: "The primary type of risk. Must be one of: Operational, Environmental, Financial, Reputational, Geopolitical, Cybersecurity.",
        },
        optimalResponseIndex: {
          type: Type.INTEGER,
          description: "The index (0, 1, or 2) of the best response from the 'options' array.",
        },
        justification: {
            type: Type.STRING,
            description: "A brief explanation of why the optimal response is the best choice, considering trade-offs."
        }
      },
      required: ["affectedProcess", "riskType", "optimalResponseIndex", "justification"],
    },
  },
  required: ["description", "options", "analysis", "difficulty"],
};

async function _augmentScenarioWithImage(scenario: Scenario, industry: Industry): Promise<Scenario> {
  try {
    // 1. Extract product name from scenario
    const productNamePrompt = `Based on this scenario for the ${industry} industry, identify the single key physical product at the center of the issue. Return only the name of the product and nothing else (e.g., "microcontroller", "denim jacket", "organic yogurt container"). Description: ${scenario.description}`;
    const nameResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: productNamePrompt,
    });
    const productName = nameResponse.text.trim();

    if (!productName) {
      console.warn("Could not extract product name, skipping image generation.");
      return scenario;
    }
    
    // 2. Generate an image for that product
    const imagePrompt = `A high-quality, professional product photograph of a ${productName}, representative of the ${industry} industry. The item should be displayed on a clean, neutral, light-colored background.`;
    
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: imagePrompt }] },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // 3. Extract image data and augment scenario
    for (const part of imageResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return {
          ...scenario,
          productName: productName,
          productImage: base64ImageBytes,
        };
      }
    }
    
    console.warn("Image generation response did not contain image data.");
    return { ...scenario, productName }; // Return with name even if image fails

  } catch (error) {
    console.error("Failed to augment scenario with image:", error);
    // If image gen fails, just return the original scenario so the game can continue
    return scenario;
  }
}


export async function generateScenario(industry: Industry, round: number, difficulty: Difficulty, gameHistory: GameHistory[] = [], processFilter: SCORProcess | null): Promise<Scenario> {
  const industryScenarios = PREDEFINED_SCENARIOS[industry] || [];
  
  let applicableScenarios = industryScenarios.filter(s => s.difficulty === difficulty);
  if (processFilter) {
    applicableScenarios = applicableScenarios.filter(s => s.analysis.affectedProcess === processFilter);
  }

  const playedDescriptions = gameHistory.map(h => h.scenario.description);
  const unplayedApplicableScenarios = applicableScenarios.filter(s => !playedDescriptions.includes(s.description));

  let baseScenario: Scenario;

  if (unplayedApplicableScenarios.length > 0) {
    console.log(`Loading predefined scenario for ${difficulty}, process: ${processFilter || 'Any'}`);
    baseScenario = unplayedApplicableScenarios[0];
  } else {
    // If no more predefined scenarios for this difficulty, generate one with AI
    console.log(`No more matching predefined scenarios. Generating with AI.`);
    const previousTurn = gameHistory.length > 0 ? gameHistory[gameHistory.length - 1] : undefined;

    const difficultyInstructions = {
      [Difficulty.Easy]: `**Task:** Create a foundational scenario focusing on a single, clear risk within one primary SCOR process. The optimal solution should be relatively straightforward, teaching a core principle. (Example: A single supplier delay).`,
      [Difficulty.Medium]: `**Task:** Create a more complex scenario involving interconnected issues. This could be a single risk impacting two SCOR processes (e.g., a sourcing issue causing a manufacturing problem) or two different types of risks occurring simultaneously. The optimal solution must involve clear trade-offs (e.g., choosing between higher cost for faster recovery vs. a cheaper but slower solution).`,
      [Difficulty.Hard]: `**Task:** Create a challenging, multi-faceted crisis with cascading effects. The scenario must involve **at least two** of the following elements: 1) a failure in one SCOR process causing problems in multiple others, 2) a significant ethical or reputational dilemma, 3) severe budget constraints limiting options, 4) conflicting advice from internal departments. The response options must be nuanced, with no perfect answer; the 'optimal' choice is the one that best mitigates the primary damage based on a specific strategic priority.`
    };
    
    const processConstraint = processFilter
      ? `\n**Strict Constraint:** The generated scenario's 'affectedProcess' MUST be **${processFilter}**. This is a mandatory requirement.`
      : '';


    let promptContext = '';
    if (previousTurn) {
      promptContext = `
        **CONTEXT from Previous Round (Round ${round - 1}):**
        - **Previous Scenario:** ${previousTurn.scenario.description}
        - **Player's Action:** "${previousTurn.scenario.options[previousTurn.decision.responseIndex]}"
        - **Result:** The player's decision was ${previousTurn.outcome.isOptimalResponse ? 'Optimal' : 'Sub-optimal'}.

        **YOUR TASK:**
        You are a simulation master creating a branching narrative. Generate a NEW follow-up scenario for Round ${round} that is a DIRECT consequence of the player's previous action.

        - **If the player's last action was Sub-optimal:** The new scenario MUST be a direct negative consequence. For example, if they ignored a supplier risk, that supplier has now failed. If they chose a cheap fix, that fix has now broken down and caused a bigger problem.
        - **If the player's last action was Optimal:** The new scenario can be a positive development (e.g., an opportunity to capitalize on their success, like a new partnership offer) or a new, unrelated challenge that tests a different skill.

        This new scenario must still be tailored to the **${industry}** industry and have a difficulty of **${difficulty}**.
      `;
    } else {
      promptContext = `
        **YOUR TASK:**
        You are an expert in supply chain management education. Generate a realistic risk scenario for a SCOR-based simulation game, tailored to the **${industry}** industry.

        **Industry:** ${industry}
        **Current Round:** ${round}
        **Difficulty Level:** ${difficulty}

        ${difficultyInstructions[difficulty]}

        The scenario must be deeply rooted in the specifics of the **${industry}** industry.
      `;
    }

    const prompt = `
      ${promptContext}
      ${processConstraint}

      **SCOR Processes Reference:** Plan, Source, Make, Deliver, Return, Enable.
      **Risk Types Reference:** Operational, Environmental, Financial, Reputational, Geopolitical, Cybersecurity.

      **Requirements:**
      1.  **description:** A detailed description of the supply chain risk scenario.
      2.  **options:** An array of three distinct, plausible response actions. For 'Hard' difficulty, ensure all options are viable but have significant and different trade-offs.
      3.  **difficulty:** The difficulty of this scenario, which MUST be "${difficulty}".
      4.  **analysis:**
          -   **affectedProcess:** The primary SCOR process where the risk originates. For Medium/Hard, other processes might be impacted, but name the source.
          -   **riskType:** The primary type of risk.
          -   **optimalResponseIndex:** The index (0, 1, or 2) of the *best possible* response. For Hard scenarios, this is the least bad option or the one that aligns with a sound long-term strategy.
          -   **justification:** A concise explanation of why the chosen response is optimal, explicitly mentioning the key trade-offs and why it's superior to the other options.

      Return the response as a JSON object that strictly adheres to the provided schema. Do not include any markdown formatting or any text outside of the JSON object.
    `;

    try {
      const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: scenarioSchema,
          },
      });

      baseScenario = JSON.parse(response.text) as Scenario;
    } catch (error) {
      console.error("Gemini API call failed in generateScenario:", error);
      throw new Error("Failed to generate scenario from AI service.");
    }
  }

  // Augment with an image regardless of the source
  return await _augmentScenarioWithImage(baseScenario, industry);
}

export async function evaluateJustification(scenario: Scenario, decision: Decision): Promise<string> {
  const prompt = `
    You are a supply chain management professor providing feedback in a simulation game.

    **Scenario Context:**
    ${scenario.description}

    **Student's Analysis & Decision:**
    - Chosen SCOR Process: ${decision.process} (Correct was: ${scenario.analysis.affectedProcess})
    - Chosen Risk Type: ${decision.riskType} (Correct was: ${scenario.analysis.riskType})
    - Chosen Response: "${scenario.options[decision.responseIndex]}" (Optimal was: "${scenario.options[scenario.analysis.optimalResponseIndex]}")
    - Student's Justification: "${decision.justification}"

    **Task:**
    Evaluate the student's justification based on their choices. Provide concise, constructive feedback in 2-4 sentences.
    - If their reasoning is sound despite wrong choices, acknowledge their thought process.
    - If their reasoning is flawed, gently correct it, explaining the trade-offs (cost, service reliability, flexibility, reputation) they might have missed.
    - Keep the tone encouraging and educational.
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed in evaluateJustification:", error);
    throw new Error("Failed to evaluate justification from AI service.");
  }
}
