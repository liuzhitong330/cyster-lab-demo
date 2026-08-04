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
      gap: "Does endothelial Ch25h act only at initial HEV exit, or does it also determine later movement into the parenchyma?",
      experiment: "Induce endothelial-specific Ch25h loss after inflammation is established, co-transfer congenically marked wild-type and EBI2-deficient B cells, and sample matched 15-, 45-, and 90-minute imaging windows.",
      readout: "Blood-normalized WT:EBI2−/− homing ratio plus each cell's distance from the nearest HEV over time.",
      control: "Cre-negative littermates, a non-draining node, transferred T cells, and the input blood ratio.",
      decisive: "Preserved vascular arrest with selective loss of wild-type B-cell displacement would place endothelial oxysterol production at the post-adhesion entry step.",
      labValue: "Separate endothelial initiation from later stromal maintenance and choose the imaging window that is most mechanistically informative.",
      cathyValue: "I can connect mouse tissue collection, competitive flow cytometry, fluorescence imaging, and reproducible time-point analysis in one workflow.",
      activeNodes: ["precursor", "intermediate"]
    },
    frc: {
      label: "Fibroblastic reticular cell",
      role: "Step 2 · complete",
      title: "FRCs convert the intermediate into the EBI2 ligand",
      copy: "Fibroblastic reticular cells express Cyp7b1, which converts 25-HC into 7α,25-HC. Their position around the venular niche lets a stromal program complete the local recruiting signal.",
      evidence: "GSE281684 profiles sorted FRC chromatin accessibility 24 hours after local inflammation.",
      gap: "Which inflammation-responsive FRC regulatory program sustains Cyp7b1-dependent completion of the ligand?",
      experiment: "Use GSE281684 to nominate accessible FRC regulators, validate the leading program by qPCR in sorted FRCs, and pair it with an FRC-specific Cyp7b1 perturbation in the short-term homing assay.",
      readout: "Accessibility and expression of the nominated program, followed by the WT:EBI2−/− homing ratio and distance from HEVs.",
      control: "Non-draining FRCs, genotype-matched FRCs, preserved endothelial Ch25h, and the input blood ratio.",
      decisive: "Reduced entry after FRC Cyp7b1 loss despite intact endothelial Ch25h would isolate ligand completion from precursor production.",
      labValue: "Prioritize which stromal regulatory program to validate before expanding the sequencing experiment or perturbation panel.",
      cathyValue: "I can bridge flow-sorted tissue and qPCR validation with R/Python genomics analysis, rather than treating the ATAC-seq record as a separate endpoint.",
      activeNodes: ["intermediate", "ligand"]
    },
    lc: {
      label: "Langerhans cell",
      role: "Additional source · reinforce",
      title: "Migratory Langerhans cells add Ch25h activity",
      copy: "Skin-derived Langerhans cells provide another source of Ch25h after local inflammation, reinforcing 25-HC production rather than placing the entire pathway in one stromal compartment.",
      evidence: "Cell-type perturbation evidence supports a distributed source of oxysterol precursor.",
      gap: "When are Langerin-positive skin migrants necessary rather than redundant with endothelial Ch25h?",
      experiment: "Apply selective depletion or Ch25h loss in Langerin-positive cells across a 6-, 12-, 24-, and 48-hour footpad-inflammation time course, followed by the same competitive B-cell transfer.",
      readout: "Langerhans-cell arrival, nodal Ch25h expression, WT:EBI2−/− homing ratio, and distance from HEVs at each time point.",
      control: "Depletion-only controls, non-draining nodes, intact endothelial Ch25h, and matched blood ratios.",
      decisive: "A time-restricted homing defect while endothelial Ch25h remains intact would reveal when the migratory source becomes non-redundant.",
      labValue: "Identify the narrow time window in which a migratory precursor source is worth perturbing instead of running a redundant endpoint experiment.",
      cathyValue: "I can execute staged mouse tissue collections and coordinate flow-cytometric and microscopy readouts across a controlled time course.",
      activeNodes: ["precursor", "intermediate"]
    },
    bcell: {
      label: "EBI2+ B cell",
      role: "Response · interpret",
      title: "Arriving B cells read the completed gradient",
      copy: "EBI2 on the B cell senses 7α,25-HC. Removing the receptor does not remove the tissue signal; it prevents the lymphocyte from using that signal to leave the venular region efficiently.",
      evidence: "At 90 minutes, wild-type cells migrate about twice as far from HEVs as EBI2-deficient cells.",
      gap: "Does EBI2 primarily control crossing at the venular gateway or post-entry dispersal and retention?",
      experiment: "Co-transfer wild-type, EBI2-deficient, and receptor-rescue B cells, then quantify vascular arrest, crossing events, speed, and displacement during a short intravital-imaging time course.",
      readout: "Crossing frequency, migration speed, distance from HEVs, dwell time, and the matched competitive homing ratio.",
      control: "Input blood normalization, CCR7-competent cells, a non-draining node, and transferred T cells as a comparator.",
      decisive: "Normal crossing with reduced displacement would support a post-entry positioning role; fewer crossing events would support a gateway-recruitment role.",
      labValue: "Choose the correct mechanistic endpoint—entry or post-entry positioning—before expanding receptor-signaling experiments.",
      cathyValue: "I can combine multi-parameter flow cytometry with quantitative microscopy and R/Python analysis to keep these endpoints aligned.",
      activeNodes: ["ligand", "responder"]
    }
  }
};
