window.CYSTER_LAB_DATA = {
  conditions: {
    homeostatic: {
      label: "Homeostatic node",
      shortLabel: "Homeostatic",
      cue: "CCL21 → CCR7",
      context: "CCL21 is available around the high endothelial venule, supporting the familiar CCR7-guided route.",
      signalTags: ["CCL21 high", "CCR7 active", "EBI2 supportive"],
      cells: {
        wt: {
          label: "Wild-type B cell",
          effect: "Efficient entry and movement into the lymph-node parenchyma.",
          status: "Entry supported",
          stopX: 575,
          routeClass: "route-complete"
        },
        ko: {
          label: "EBI2−/− B cell",
          effect: "A modest disadvantage is detectable, but CCR7-linked cues remain available.",
          status: "Partial entry",
          stopX: 486,
          routeClass: "route-partial"
        }
      }
    },
    inflamed: {
      label: "Inflamed draining node",
      shortLabel: "Inflamed node",
      cue: "7α,25-HC → EBI2",
      context: "At 24 hours after local LCMV challenge, CCL21 falls while an oxysterol cue becomes important at the venular gateway.",
      signalTags: ["CCL21 down", "CCL19 retained", "7α,25-HC induced"],
      cells: {
        wt: {
          label: "Wild-type B cell",
          effect: "Efficient recruitment; cells move farther from the venule into the parenchyma.",
          status: "Oxysterol-guided entry",
          stopX: 587,
          routeClass: "route-complete"
        },
        ko: {
          label: "EBI2−/− B cell",
          effect: "50–70% lower representation after 90 minutes; cells remain closer to the venule.",
          status: "Recruitment impaired",
          stopX: 352,
          routeClass: "route-blocked"
        }
      }
    },
    tumor: {
      label: "MC38 tumor",
      shortLabel: "MC38 tumor",
      cue: "Endothelial oxysterol → EBI2",
      context: "Tumor endothelium expresses Ch25h in a setting where CCL21 is not detected, creating another EBI2-dependent gateway for B cells.",
      signalTags: ["CCL21 absent", "Ch25h endothelial", "B-cell selective defect"],
      cells: {
        wt: {
          label: "Wild-type B cell",
          effect: "B-cell entry into the tumor is supported.",
          status: "Tumor entry supported",
          stopX: 563,
          routeClass: "route-complete"
        },
        ko: {
          label: "EBI2−/− B cell",
          effect: "50–70% deficiency in tumor entry; transferred T cells did not share this significant defect.",
          status: "Tumor entry impaired",
          stopX: 325,
          routeClass: "route-blocked"
        }
      }
    }
  },
  cells: {
    wt: "Wild-type B cell",
    ko: "EBI2−/− B cell"
  },
  builders: {
    hev: {
      label: "HEV endothelium",
      role: "Step 1 · initiate",
      title: "High endothelial venules generate the intermediate",
      copy: "Inflammatory high endothelial venules upregulate Ch25h, converting cholesterol to 25-hydroxycholesterol at the point where blood-borne lymphocytes first contact the tissue.",
      evidence: "Genetic and expression evidence: endothelial Ch25h supports B-cell recruitment.",
      activeNodes: ["precursor", "intermediate"]
    },
    frc: {
      label: "Fibroblastic reticular cell",
      role: "Step 2 · complete",
      title: "FRCs convert the intermediate into the EBI2 ligand",
      copy: "Fibroblastic reticular cells express Cyp7b1, which converts 25-HC into 7α,25-HC. Their position around the venular niche lets a stromal program complete the local recruiting signal.",
      evidence: "GSE281684 profiles sorted FRC chromatin accessibility 24 hours after local inflammation.",
      activeNodes: ["intermediate", "ligand"]
    },
    lc: {
      label: "Langerhans cell",
      role: "Additional source · reinforce",
      title: "Migratory Langerhans cells add Ch25h activity",
      copy: "Skin-derived Langerhans cells provide another source of Ch25h after local inflammation, reinforcing 25-HC production rather than placing the entire pathway in one stromal compartment.",
      evidence: "Cell-type perturbation evidence supports a distributed source of oxysterol precursor.",
      activeNodes: ["precursor", "intermediate"]
    },
    bcell: {
      label: "EBI2+ B cell",
      role: "Response · interpret",
      title: "Arriving B cells read the completed gradient",
      copy: "EBI2 on the B cell senses 7α,25-HC. Removing the receptor does not remove the tissue signal; it prevents the lymphocyte from using that signal to leave the venular region efficiently.",
      evidence: "At 90 minutes, wild-type cells migrate about twice as far from HEVs as EBI2-deficient cells.",
      activeNodes: ["ligand", "responder"]
    }
  }
};
