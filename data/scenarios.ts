import { Scenario, Industry, SCORProcess, RiskType, Difficulty } from '../types';

export const PREDEFINED_SCENARIOS: Record<Industry, Scenario[]> = {
  [Industry.Electronics]: [
    {
      description: "Your primary supplier of microcontrollers for a best-selling smartphone has just informed you of a 2-week production delay due to a machine failure at their plant. This will directly impact your 'Make' process schedule and sales forecasts. How do you respond?",
      options: [
        "Immediately pay a premium to air-freight available parts from a secondary, more expensive supplier to prevent a production halt.",
        "Wait for the primary supplier to resolve their issue, accepting the two-week production line stoppage.",
        "Re-route microcontrollers intended for a less popular tablet product to keep the smartphone line running, delaying the tablet launch."
      ],
      difficulty: Difficulty.Easy,
      analysis: {
        affectedProcess: SCORProcess.Source,
        riskType: RiskType.Operational,
        optimalResponseIndex: 0,
        justification: "While expensive, securing parts from a secondary supplier ensures production continuity for a high-demand product, mitigating larger revenue losses and reputational damage from stockouts. Waiting is too passive, and re-routing simply shifts the problem, creating a new shortage."
      }
    },
    {
      description: "A new cybersecurity threat has emerged: a sophisticated phishing campaign is targeting your 'Enable' team, specifically the engineers with access to your ERP system that manages planning and inventory data. A breach could cripple your entire operation.",
      options: [
          "Mandate immediate, company-wide password resets and a 2-hour cybersecurity training for all employees, causing minor operational disruption.",
          "Hire a third-party cybersecurity firm to conduct a full audit and penetration test, which will take two weeks and be very costly.",
          "Isolate the ERP system from the main network temporarily, significantly slowing down planning and logistics, until the threat is neutralized."
      ],
      difficulty: Difficulty.Medium,
      analysis: {
          affectedProcess: SCORProcess.Enable,
          riskType: RiskType.Cybersecurity,
          optimalResponseIndex: 0,
          justification: "Immediate training and password resets are a proactive, cost-effective first step that addresses the immediate human-element vulnerability without the major cost of an audit or the severe operational impact of isolating the ERP system. It's the best balance of speed, cost, and effectiveness for an active threat."
      }
    },
    {
      description: "Your company has discovered a data breach in your customer relationship management (CRM) system, part of your 'Enable' infrastructure. Personal data for thousands of customers has been exfiltrated. The vulnerability has been identified but not yet patched. The media has not reported on it yet. What is your immediate priority?",
      options: [
        "Immediately notify all affected customers and offer free credit monitoring, before the vulnerability is fully patched.",
        "Quietly patch the vulnerability over the next 48 hours and then prepare a public statement, delaying customer notification.",
        "Engage a PR firm to manage communications and downplay the severity, while the IT team works on the patch."
      ],
      difficulty: Difficulty.Medium,
      analysis: {
        affectedProcess: SCORProcess.Enable,
        riskType: RiskType.Cybersecurity,
        optimalResponseIndex: 1,
        justification: "The immediate priority in an active breach is containment. Patching the vulnerability first prevents further data exfiltration and is the most responsible technical action. Notifying customers before the system is secured could cause panic and alert other attackers to the live vulnerability, while downplaying the incident poses a massive long-term reputational risk."
      }
    },
    {
      description: "A key piece of automated assembly equipment in your main factory is showing signs of imminent failure, threatening your 'Make' process. The replacement part has a six-week lead time. A full breakdown would halt production for at least a month.",
      options: [
        "Schedule an immediate, three-day planned shutdown to perform emergency maintenance with temporary fixes.",
        "Continue running the equipment at a reduced speed (70% capacity) to lessen the strain, hoping it lasts until the part arrives.",
        "Do nothing and run the equipment as normal, expediting the order for the replacement part and hoping it arrives before a failure."
      ],
      difficulty: Difficulty.Easy,
      analysis: {
        affectedProcess: SCORProcess.Make,
        riskType: RiskType.Operational,
        optimalResponseIndex: 0,
        justification: "Planned downtime, while disruptive, is far more manageable and less costly than a catastrophic, unplanned shutdown. It allows for controlled maintenance and minimizes the overall risk to production targets."
      }
    },
    {
      description: "The government has just announced a new 25% tariff on imported semiconductors from your primary sourcing country, effective in 30 days. This will dramatically increase your COGS, invalidating your financial 'Plan' for the next two quarters.",
      options: [
        "Immediately place a massive, final order before the tariff hits, tying up huge amounts of capital in inventory to delay the impact.",
        "Absorb the cost increase immediately and pass it on to consumers through a price hike, risking a significant drop in sales.",
        "Initiate a costly, rapid project to redesign key products to use components from a domestic supplier, which will take 6-9 months."
      ],
      difficulty: Difficulty.Hard,
      analysis: {
        affectedProcess: SCORProcess.Plan,
        riskType: RiskType.Geopolitical,
        optimalResponseIndex: 0,
        justification: "Strategic buying before the tariff is a common mitigation tactic. It's a high-risk, high-capital move, but it buys invaluable time to enact a longer-term strategy (like redesigning) without immediately losing market share due to price hikes. The trade-off is inventory risk vs. market position."
      }
    },
    {
      description: "The currency of the country where you source 60% of your high-performance memory chips has unexpectedly strengthened by 15% against your local currency. Your current purchasing contract is priced in the foreign currency, meaning your component costs for the next quarter have just surged, threatening your product margins.",
      options: [
        "Immediately execute a currency hedge for the next six months of purchases to lock in a rate that is unfavorable but protects against further losses.",
        "Begin an expedited qualification process for an alternative, domestic supplier, which will cause short-term production delays and has an uncertain outcome.",
        "Pass the increased cost directly to consumers by raising the product price, risking a loss of market share."
      ],
      difficulty: Difficulty.Medium,
      analysis: {
        affectedProcess: SCORProcess.Source,
        riskType: RiskType.Financial,
        optimalResponseIndex: 0,
        justification: "Hedging is the most direct and appropriate response to a currency-based financial risk. It provides immediate cost certainty for near-term planning without disrupting the physical supply chain or damaging customer relationships. While qualifying a new supplier is a good long-term move, it doesn't solve the immediate margin crisis, and passing costs to consumers is a risky move that could cede market share."
      }
    }
  ],
  [Industry.Apparel]: [
     {
      description: "Your primary logistics partner for last-mile delivery is experiencing a week-long delay due to a local transport strike right before a major holiday sales event. This jeopardizes your 'Deliver' promises to customers.",
      options: [
        "Immediately contract with a more expensive, alternative courier service for all affected orders to meet delivery promises.",
        "Proactively inform customers about potential delays and offer a 15% discount on their next purchase as an apology.",
        "Wait for the strike to resolve, hoping the partner can clear the backlog with minimal delays."
      ],
      difficulty: Difficulty.Easy,
      analysis: {
        affectedProcess: SCORProcess.Deliver,
        riskType: RiskType.Operational,
        optimalResponseIndex: 0,
        justification: "In the fast-fashion and apparel industry, meeting delivery expectations, especially during holidays, is critical for customer satisfaction and brand loyalty. The higher cost of an alternative courier is a justified expense to prevent reputational damage and customer churn."
      }
    },
    {
      description: "A new report from an international watchdog group has accused a key textile supplier in your 'Source' chain of using unethical labor practices. The report is gaining traction on social media. Continuing with this supplier risks severe brand damage, but severing ties mid-season will cause massive 'Make' and 'Deliver' disruptions for your fall collection.",
      options: [
        "Immediately sever ties with the supplier and issue a public statement, accepting the major production delays and financial loss.",
        "Publicly state you are 'investigating the claims' while privately expediting as many shipments as possible before making a final decision.",
        "Engage a third-party auditor to conduct an immediate, transparent investigation of the supplier's facilities and base your next steps on their public findings."
      ],
      difficulty: Difficulty.Medium,
      analysis: {
        affectedProcess: SCORProcess.Source,
        riskType: RiskType.Reputational,
        optimalResponseIndex: 2,
        justification: "This option is the most responsible and strategically sound. It demonstrates due diligence over a knee-jerk reaction. It is transparent, protects the brand from accusations of a cover-up (unlike option 2), and avoids the immediate supply chain disruption of option 1, allowing for a managed transition if claims are verified."
      }
    },
    {
      description: "A new environmental regulation bans a specific chemical dye crucial for your brand's signature color palette. Your current inventory of dyed fabric is now unusable for new production. This affects your 'Make' process and throws your seasonal 'Plan' into chaos. There is no perfect color-match substitute available.",
      options: [
        "Re-purpose the existing fabric for a lower-margin product line (e.g., tote bags) to recoup some cost, and launch the main collection late with a new color story.",
        "Scrap the unusable inventory at a huge loss and rush a new collection with a limited, new color palette that may not resonate with customers.",
        "Lobby the government for an exemption, a process that is costly and uncertain, while pausing production and hoping for a favorable outcome."
      ],
      difficulty: Difficulty.Hard,
      analysis: {
        affectedProcess: SCORProcess.Make,
        riskType: RiskType.Environmental,
        optimalResponseIndex: 0,
        justification: "This is the 'least bad' option. It mitigates the financial loss from the unusable inventory, shows proactive problem-solving, and invests in a long-term sustainable solution, even though it causes a significant delay. Option 2 is too financially damaging, and option 3 is a gamble with no guaranteed outcome."
      }
    }
  ],
  [Industry.Food]: [
    {
      description: "A key supplier of organic strawberries for your premium jam has a partial crop failure due to unexpected frost, reducing their delivery volume by 50% for the next month. This will affect your 'Source' and 'Make' capabilities.",
      options: [
        "Source the remaining 50% from a certified organic, but much more expensive, spot-market supplier to maintain production levels.",
        "Reduce production of strawberry jam by 50%, leading to stockouts but maintaining margin per unit.",
        "Substitute the missing 50% with non-organic strawberries but do not change the product's 'Organic' label, creating a compliance risk."
      ],
      difficulty: Difficulty.Easy,
      analysis: {
        affectedProcess: SCORProcess.Source,
        riskType: RiskType.Operational,
        optimalResponseIndex: 0,
        justification: "Maintaining the 'organic' promise to the consumer is paramount for a premium food brand. The higher cost is a necessary expense to protect brand integrity and avoid legal/reputational disaster. Option 3 is illegal and unethical."
      }
    },
    {
      description: "A batch of your popular organic yogurt has been flagged for a potential contamination issue at a third-party logistics (3PL) warehouse. The product is already in the 'Deliver' phase, en route to major retailers. A recall would be costly and damage your brand's reputation for quality.",
      options: [
        "Halt all shipments and pay for expedited lab testing to confirm the contamination before taking further action.",
        "Issue an immediate, full-scale public recall of the entire batch, absorbing the cost and reputational hit to prioritize safety.",
        "Quietly work with retailers to pull the specific batch from shelves without a public announcement to minimize panic."
      ],
      difficulty: Difficulty.Medium,
      analysis: {
        affectedProcess: SCORProcess.Deliver,
        riskType: RiskType.Reputational,
        optimalResponseIndex: 0,
        justification: "Confirming the issue before a full recall is the most prudent step. A false alarm recall is unnecessarily damaging, while a quiet recall (option 3) is unethical and extremely risky if the product is genuinely harmful. Testing provides data for an informed decision, balancing cost, safety, and reputation."
      }
    },
    {
      description: "A major supermarket chain, your biggest customer, has gone into sudden bankruptcy. They are returning millions of dollars of your perishable product (via the 'Return' process) with a 30-day shelf life, and their massive outstanding invoice will likely go unpaid.",
      options: [
        "Attempt to resell the returned product to discount grocery chains at a steep 70% markdown to recover some cost before it expires.",
        "Donate the entire stock to food banks for a smaller tax write-off and positive PR, accepting a near-total loss on the product's value.",
        "Write off the returned product and the bad debt immediately. Absorb the full loss and focus all resources on securing new retail partners."
      ],
      difficulty: Difficulty.Hard,
      analysis: {
        affectedProcess: SCORProcess.Return,
        riskType: RiskType.Financial,
        optimalResponseIndex: 0,
        justification: "In a massive financial crisis, immediate cash flow is paramount. While reselling at a discount risks brand dilution, recovering even a fraction of the cost of goods is the most financially responsible action. A donation is good PR but doesn't help the immediate financial hole, and simply writing it all off is too passive."
      }
    }
  ],
  [Industry.Logistics]: [
    {
      description: "A sudden, severe hurricane is forecast to hit a major coastal port where your company has significant 'Deliver' operations. A large number of containers are scheduled to be unloaded and transported inland over the next 72 hours. The port authority has issued a warning but has not yet ordered a mandatory evacuation.",
      options: [
        "Pay overtime to all staff to accelerate unloading and inland transport of the most critical containers before the storm hits.",
        "Proactively re-route incoming ships to a different port 200 miles away, incurring significant fuel costs but guaranteeing safety.",
        "Continue operations as normal to avoid delays and extra costs, hoping the storm's path changes."
      ],
      difficulty: Difficulty.Easy,
      analysis: {
        affectedProcess: SCORProcess.Deliver,
        riskType: RiskType.Environmental,
        optimalResponseIndex: 0,
        justification: "Accelerating operations is a balanced approach. It acknowledges the risk and prioritizes high-value cargo without incurring the massive, certain costs of re-routing the entire fleet (option 2). Ignoring the warning (option 3) is an unacceptable gamble with assets and personnel safety."
      }
    },
    {
      description: "Fuel prices have unexpectedly spiked by 40% and are projected to stay high for the next six months. Your current contracts with clients are based on much lower fuel cost assumptions, making many of your key routes unprofitable and disrupting your financial 'Plan'.",
      options: [
        "Immediately implement a transparent fuel surcharge for all clients, as is standard industry practice, risking some customer complaints.",
        "Absorb the losses for the next six months to maintain customer goodwill, severely impacting your company's profitability.",
        "Undertake an emergency network re-optimization project to consolidate routes, which will take a month and cause temporary service disruptions."
      ],
      difficulty: Difficulty.Medium,
      analysis: {
        affectedProcess: SCORProcess.Plan,
        riskType: RiskType.Financial,
        optimalResponseIndex: 0,
        justification: "While unpopular, a fuel surcharge is a standard, accepted practice in logistics to deal with price volatility. It's transparent and directly addresses the profitability crisis. Absorbing the loss could be catastrophic, and re-optimization is a good long-term strategy but too slow to fix the immediate problem."
      }
    },
    {
      description: "A major international shipping lane has been suddenly closed due to a geopolitical conflict. Your company's custom-built TMS (Transportation Management System) ('Enable') cannot model these large-scale disruptions, making your routing and planning tools obsolete overnight.",
      options: [
        "Hire a team of expensive consultants to manually re-plan all routes daily using their own software, creating a dependency but providing an immediate fix.",
        "Task your internal IT team to build a 'patch' for the current TMS. This will divert them from all other projects for 3 months and the result will be a stop-gap measure.",
        "Immediately invest in a new, expensive, off-the-shelf TMS and begin a rush 6-month implementation, causing massive internal disruption but providing a long-term solution."
      ],
      difficulty: Difficulty.Hard,
      analysis: {
        affectedProcess: SCORProcess.Enable,
        riskType: RiskType.Geopolitical,
        optimalResponseIndex: 0,
        justification: "In a crisis of this scale, speed and business continuity are essential. The manual re-planning by experts (consultants) immediately addresses the operational failure, keeping goods moving for clients. While expensive, it's a necessary triage step. The other options are too slow to address the immediate, critical failure of the planning system."
      }
    },
    {
      description: "A ransomware attack has encrypted the live data on your primary route-planning servers, a critical 'Enable' system. The attackers demand payment for the decryption key. Paying is not guaranteed to work, while restoring from backups will result in losing one week of transactional data.",
      options: [
        "Pay the ransom to minimize downtime, accepting the financial cost and the risk that the attackers won't provide a working key.",
        "Refuse to pay and immediately activate the disaster recovery plan. Restore from last week's backups, accepting the data loss and the operational chaos of manually re-entering a week's worth of data.",
        "Attempt to negotiate a lower ransom with the attackers while simultaneously starting the slow process of rebuilding the servers from scratch, prolonging the outage."
      ],
      difficulty: Difficulty.Medium,
      analysis: {
        affectedProcess: SCORProcess.Enable,
        riskType: RiskType.Cybersecurity,
        optimalResponseIndex: 1,
        justification: "While painful due to data loss, relying on a robust disaster recovery plan is the correct long-term cybersecurity posture. Paying the ransom encourages future attacks, offers no guarantee of recovery, and may have legal implications. The focus should be on recovery, not negotiation."
      }
    },
    {
      description: "An investigative report has exposed one of your major last-mile 'Deliver' subcontractors for exploiting its drivers with poor pay and unsafe working conditions. The story is going viral, #SupplyChainShame is trending, and major clients are threatening to pull contracts over the reputational damage by association.",
      options: [
        "Immediately terminate the contract with the subcontractor and issue a public apology, causing a sudden 30% drop in your delivery capacity and major service failures.",
        "Publicly defend the subcontractor, citing your standard contractual agreements, while launching an internal, non-public investigation, hoping to weather the media storm without service disruption.",
        "Publicly suspend the subcontractor pending a swift, independent third-party audit. Simultaneously, establish a temporary 'Driver Relief Fund', paid directly by your company, to address the immediate ethical concerns while you arrange alternative capacity."
      ],
      difficulty: Difficulty.Hard,
      analysis: {
        affectedProcess: SCORProcess.Deliver,
        riskType: RiskType.Reputational,
        optimalResponseIndex: 2,
        justification: "This is a nuanced approach that best protects brand reputation. Terminating the contract is a knee-jerk reaction that creates an operational crisis. Defending them is reputationally suicidal. Option 3 shows immediate, decisive public action (suspension, audit) and addresses the ethical issue (relief fund), buying time to find a long-term solution without a total operational collapse."
      }
    }
  ]
};