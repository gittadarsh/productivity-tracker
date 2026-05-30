import {
  generateRecommendations,
} from "./recommendationEngine";

import {
  generateMemoryInsights,
} from "./productivityMemoryEngine";

import {
  getProductivityPersona,
} from "./personaEngine";

import {
  generateAnalytics,
} from "./analyticsEngine";

export const generateAIBrain =
  productivity => {

    const recommendations =
      generateRecommendations({

        score:
          productivity.score,

        streak:
          productivity.streak,

        sessions:
          productivity.sessions,
      });

    const memory =
      generateMemoryInsights({

        score:
          productivity.score,

        streak:
          productivity.streak,

        sessions:
          productivity.sessions,
      });

    const persona =
      getProductivityPersona(
        productivity
      );

    const analytics =
      generateAnalytics({

        xp:
          productivity.xp,

        sessions:
          productivity.sessions,

        streak:
          productivity.streak,
      });

    /* AI STATUS */

    let status =
      "stable";

    if (
      productivity.score >= 85
    ) {

      status =
        "elite";
    }

    if (
      productivity.streak < 3
    ) {

      status =
        "warning";
    }

    return {

      status,

      persona,

      memory,

      analytics,

      recommendations,
    };
  };