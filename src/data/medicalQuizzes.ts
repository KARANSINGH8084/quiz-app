// ✅ NEW FILE: Medical question bank with difficulty levels, key points, and references
import { Quiz } from '../types';

export const medicalQuizzes: Quiz[] = [
  {
    id: 'med1',
    title: 'Anatomy Basics - Level 1',
    category: 'Anatomy',
    difficulty: 'easy',
    level: 1,
    timeLimit: 15,
    questions: [
      {
        id: 'med1_1',
        question: 'Which of the following is the hardest tissue in the human body?',
        options: ['Dentin', 'Bone', 'Enamel', 'Cementum'],
        correctAnswer: 2,
        category: 'Anatomy',
        difficulty: 1,
        keyPoint: 'Enamel is the hardest tissue due to its 96% hydroxyapatite content.',
        reference: 'Textbook of Oral Biology, Al-Azzawi'
      },
      {
        id: 'med1_2',
        question: 'How many bones are in the adult human body?',
        options: ['186', '206', '216', '226'],
        correctAnswer: 1,
        category: 'Anatomy',
        difficulty: 1,
        keyPoint: 'An adult human has 206 bones, while infants have around 270 which fuse during development.',
        reference: 'Gray\'s Anatomy, 42nd Edition'
      },
      {
        id: 'med1_3',
        question: 'What is the largest organ in the human body?',
        options: ['Liver', 'Brain', 'Skin', 'Heart'],
        correctAnswer: 2,
        category: 'Anatomy',
        difficulty: 1,
        keyPoint: 'The skin is the largest organ, covering approximately 2 square meters in adults.',
        reference: 'Principles of Anatomy and Physiology, Tortora & Derrickson'
      },
      {
        id: 'med1_4',
        question: 'Which chamber of the heart pumps blood to the body?',
        options: ['Right atrium', 'Right ventricle', 'Left atrium', 'Left ventricle'],
        correctAnswer: 3,
        category: 'Anatomy',
        difficulty: 1,
        keyPoint: 'The left ventricle has the thickest myocardial wall to generate sufficient pressure for systemic circulation.',
        reference: 'Clinical Anatomy by Regions, Snell'
      },
      {
        id: 'med1_5',
        question: 'What is the longest bone in the human body?',
        options: ['Tibia', 'Femur', 'Humerus', 'Radius'],
        correctAnswer: 1,
        category: 'Anatomy',
        difficulty: 1,
        keyPoint: 'The femur (thighbone) is approximately 1/4 of a person\'s height.',
        reference: 'Clinically Oriented Anatomy, Moore et al.'
      }
    ]
  },
  {
    id: 'med2',
    title: 'Physiology Essentials - Level 2',
    category: 'Physiology',
    difficulty: 'medium',
    level: 2,
    timeLimit: 20,
    questions: [
      {
        id: 'med2_1',
        question: 'What is the normal pH range of human blood?',
        options: ['6.8-7.0', '7.0-7.2', '7.35-7.45', '7.5-7.6'],
        correctAnswer: 2,
        category: 'Physiology',
        difficulty: 2,
        keyPoint: 'Blood pH is tightly regulated by buffer systems, respiratory control, and renal mechanisms.',
        reference: 'Guyton and Hall Textbook of Medical Physiology, 14th Edition'
      },
      {
        id: 'med2_2',
        question: 'What is the primary function of hemoglobin?',
        options: ['Immune defense', 'Blood clotting', 'Oxygen transport', 'Nutrient delivery'],
        correctAnswer: 2,
        category: 'Physiology',
        difficulty: 2,
        keyPoint: 'Each hemoglobin molecule can bind up to 4 oxygen molecules. Normal Hb: Males 13.5-17.5 g/dL, Females 12-16 g/dL.',
        reference: 'Vander\'s Human Physiology, 15th Edition'
      },
      {
        id: 'med2_3',
        question: 'What is the pacemaker of the heart?',
        options: ['AV node', 'SA node', 'Bundle of His', 'Purkinje fibers'],
        correctAnswer: 1,
        category: 'Physiology',
        difficulty: 2,
        keyPoint: 'The SA node generates 60-100 impulses per minute and controls normal heart rhythm.',
        reference: 'Berne and Levy Physiology, 7th Edition'
      },
      {
        id: 'med2_4',
        question: 'Normal resting heart rate for adults is:',
        options: ['40-60 bpm', '60-100 bpm', '100-120 bpm', '120-140 bpm'],
        correctAnswer: 1,
        category: 'Physiology',
        difficulty: 2,
        keyPoint: 'Bradycardia is <60 bpm, tachycardia is >100 bpm in adults at rest.',
        reference: 'Cardiovascular Physiology Concepts, Klabunde'
      },
      {
        id: 'med2_5',
        question: 'What is the average tidal volume in a healthy adult?',
        options: ['250 mL', '500 mL', '750 mL', '1000 mL'],
        correctAnswer: 1,
        category: 'Physiology',
        difficulty: 2,
        keyPoint: 'Tidal volume (TV) is approximately 500 mL or 6-8 mL/kg of ideal body weight.',
        reference: 'West\'s Respiratory Physiology, 11th Edition'
      }
    ]
  },
  {
    id: 'med3',
    title: 'Pharmacology - Level 3',
    category: 'Pharmacology',
    difficulty: 'medium',
    level: 3,
    timeLimit: 25,
    questions: [
      {
        id: 'med3_1',
        question: 'What is the mechanism of action of aspirin?',
        options: ['COX-1 inhibitor', 'COX-2 inhibitor', 'Irreversible COX-1 and COX-2 inhibitor', 'Reversible COX inhibitor'],
        correctAnswer: 2,
        category: 'Pharmacology',
        difficulty: 3,
        keyPoint: 'Aspirin irreversibly acetylates COX enzymes, preventing prostaglandin synthesis. Effects last for platelet lifespan (7-10 days).',
        reference: 'Goodman & Gilman\'s The Pharmacological Basis of Therapeutics, 13th Edition'
      },
      {
        id: 'med3_2',
        question: 'What class of drug is metformin?',
        options: ['Sulfonylurea', 'Biguanide', 'Thiazolidinedione', 'DPP-4 inhibitor'],
        correctAnswer: 1,
        category: 'Pharmacology',
        difficulty: 3,
        keyPoint: 'Metformin decreases hepatic gluconeogenesis and increases peripheral insulin sensitivity. First-line for Type 2 DM.',
        reference: 'Basic and Clinical Pharmacology, Katzung, 15th Edition'
      },
      {
        id: 'med3_3',
        question: 'Which antibiotic inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit?',
        options: ['Tetracycline', 'Ciprofloxacin', 'Azithromycin', 'Penicillin'],
        correctAnswer: 2,
        category: 'Pharmacology',
        difficulty: 3,
        keyPoint: 'Macrolides (azithromycin, clarithromycin) bind 50S subunit. Aminoglycosides and tetracyclines bind 30S subunit.',
        reference: 'Lippincott Illustrated Reviews: Pharmacology, 7th Edition'
      },
      {
        id: 'med3_4',
        question: 'What is the antidote for warfarin overdose?',
        options: ['Protamine sulfate', 'Vitamin K', 'Fresh frozen plasma', 'Vitamin K and FFP'],
        correctAnswer: 3,
        category: 'Pharmacology',
        difficulty: 3,
        keyPoint: 'Warfarin inhibits vitamin K-dependent clotting factors (II, VII, IX, X). Treatment: Vitamin K for reversal, FFP for immediate effect.',
        reference: 'Clinical Pharmacology, Bennett & Brown, 12th Edition'
      },
      {
        id: 'med3_5',
        question: 'Which beta-blocker is cardioselective?',
        options: ['Propranolol', 'Atenolol', 'Labetalol', 'Carvedilol'],
        correctAnswer: 1,
        category: 'Pharmacology',
        difficulty: 3,
        keyPoint: 'Cardioselective beta-blockers (atenolol, metoprolol) preferentially block β1 receptors, safer in asthma/COPD.',
        reference: 'Rang and Dale\'s Pharmacology, 9th Edition'
      }
    ]
  },
  {
    id: 'med4',
    title: 'Pathology - Level 4',
    category: 'Pathology',
    difficulty: 'hard',
    level: 4,
    timeLimit: 30,
    questions: [
      {
        id: 'med4_1',
        question: 'What is the most common type of lung cancer?',
        options: ['Small cell carcinoma', 'Adenocarcinoma', 'Squamous cell carcinoma', 'Large cell carcinoma'],
        correctAnswer: 1,
        category: 'Pathology',
        difficulty: 4,
        keyPoint: 'Adenocarcinoma (40%) is most common, often peripheral. Squamous (25-30%) is central. Small cell (15%) worst prognosis.',
        reference: 'Robbins and Cotran Pathologic Basis of Disease, 10th Edition'
      },
      {
        id: 'med4_2',
        question: 'Which cell type is characteristic of Hodgkin lymphoma?',
        options: ['Plasma cells', 'Reed-Sternberg cells', 'Auer rods', 'Signet ring cells'],
        correctAnswer: 1,
        category: 'Pathology',
        difficulty: 4,
        keyPoint: 'Reed-Sternberg cells (large binucleate/multinucleate cells with "owl\'s eye" nuclei) are pathognomonic for Hodgkin lymphoma.',
        reference: 'Robbins Basic Pathology, 10th Edition'
      },
      {
        id: 'med4_3',
        question: 'What is the hallmark microscopic finding in acute myocardial infarction after 24 hours?',
        options: ['Coagulative necrosis with neutrophil infiltration', 'Granulation tissue', 'Collagen scar', 'Normal tissue'],
        correctAnswer: 0,
        category: 'Pathology',
        difficulty: 4,
        keyPoint: 'MI timeline: <4h no changes, 4-12h early coagulative necrosis, 1-3 days neutrophils, 3-7 days macrophages, 7+ days scar.',
        reference: 'Pathology: A Modern Case Study, Klatt'
      },
      {
        id: 'med4_4',
        question: 'What is the most common cause of death in diabetic patients?',
        options: ['Diabetic ketoacidosis', 'Hypoglycemia', 'Cardiovascular disease', 'Renal failure'],
        correctAnswer: 2,
        category: 'Pathology',
        difficulty: 4,
        keyPoint: 'Cardiovascular disease accounts for 50-80% of deaths in diabetics due to accelerated atherosclerosis.',
        reference: 'Kumar and Clark\'s Clinical Medicine, 10th Edition'
      },
      {
        id: 'med4_5',
        question: 'Which type of necrosis is typically seen in tuberculosis?',
        options: ['Coagulative', 'Liquefactive', 'Caseous', 'Fat necrosis'],
        correctAnswer: 2,
        category: 'Pathology',
        difficulty: 4,
        keyPoint: 'Caseous necrosis (cheese-like appearance) is characteristic of TB with granulomas and central necrosis.',
        reference: 'Harsh Mohan Textbook of Pathology, 8th Edition'
      }
    ]
  },
  {
    id: 'med5',
    title: 'Clinical Medicine - Level 5',
    category: 'Medicine',
    difficulty: 'hard',
    level: 5,
    timeLimit: 35,
    questions: [
      {
        id: 'med5_1',
        question: 'What is the first-line treatment for acute ST-elevation myocardial infarction (STEMI)?',
        options: ['Aspirin only', 'Primary PCI within 90 minutes', 'Thrombolysis', 'Beta-blockers'],
        correctAnswer: 1,
        category: 'Medicine',
        difficulty: 5,
        keyPoint: 'Primary PCI within 90 min is gold standard. If not available within 120 min, consider thrombolysis. MONA: Morphine, O2, Nitrates, Aspirin.',
        reference: 'Harrison\'s Principles of Internal Medicine, 21st Edition'
      },
      {
        id: 'med5_2',
        question: 'Which scoring system is used to assess stroke severity?',
        options: ['APACHE II', 'NIHSS', 'Glasgow Coma Scale', 'SOFA score'],
        correctAnswer: 1,
        category: 'Medicine',
        difficulty: 5,
        keyPoint: 'NIHSS (National Institutes of Health Stroke Scale) ranges 0-42. Score >20 indicates severe stroke. Used for tPA eligibility.',
        reference: 'Adams and Victor\'s Principles of Neurology, 11th Edition'
      },
      {
        id: 'med5_3',
        question: 'What is the gold standard for diagnosing pulmonary embolism?',
        options: ['D-dimer', 'Chest X-ray', 'CT pulmonary angiography', 'ECG'],
        correctAnswer: 2,
        category: 'Medicine',
        difficulty: 5,
        keyPoint: 'CTPA is gold standard (sensitivity 83-100%). D-dimer useful for exclusion if Wells score low. Classic ECG: S1Q3T3 pattern.',
        reference: 'Oxford Textbook of Medicine, 6th Edition'
      },
      {
        id: 'med5_4',
        question: 'What is the diagnostic criteria for septic shock according to Sepsis-3?',
        options: ['Sepsis + hypotension', 'Sepsis + lactate >2 + vasopressors', 'SIRS + infection', 'qSOFA ≥2'],
        correctAnswer: 1,
        category: 'Medicine',
        difficulty: 5,
        keyPoint: 'Sepsis-3: Septic shock = sepsis + lactate >2 mmol/L + requiring vasopressors to maintain MAP ≥65 mmHg despite fluid resuscitation.',
        reference: 'The ICU Book, Marino, 4th Edition'
      },
      {
        id: 'med5_5',
        question: 'What is the Child-Pugh score used for?',
        options: ['Liver disease severity', 'Heart failure severity', 'Renal function', 'Respiratory failure'],
        correctAnswer: 0,
        category: 'Medicine',
        difficulty: 5,
        keyPoint: 'Child-Pugh assesses liver cirrhosis severity (A, B, C) based on: bilirubin, albumin, INR, ascites, encephalopathy. MELD score predicts mortality.',
        reference: 'Sleisenger and Fordtran\'s Gastrointestinal and Liver Disease, 11th Edition'
      }
    ]
  },
  {
    id: 'med6',
    title: 'Advanced Clinical Cases - Level 6',
    category: 'Clinical',
    difficulty: 'hard',
    level: 6,
    timeLimit: 40,
    questions: [
      {
        id: 'med6_1',
        question: 'A 45-year-old woman presents with progressive muscle weakness, difficulty swallowing, and a heliotrope rash. Labs show elevated CK and positive anti-Jo-1 antibodies. What is the most likely diagnosis?',
        options: ['Polymyositis', 'Dermatomyositis', 'Systemic lupus erythematosus', 'Mixed connective tissue disease'],
        correctAnswer: 1,
        category: 'Clinical',
        difficulty: 6,
        keyPoint: 'Dermatomyositis: proximal muscle weakness + characteristic skin findings (heliotrope rash, Gottron papules) + elevated CK + anti-Jo-1. High cancer association.',
        reference: 'Kelley and Firestein\'s Textbook of Rheumatology, 11th Edition'
      },
      {
        id: 'med6_2',
        question: 'What is the mechanism of acute tubular necrosis in rhabdomyolysis?',
        options: ['Direct tubular toxicity from myoglobin', 'Tubular obstruction from myoglobin casts', 'Renal vasoconstriction', 'All of the above'],
        correctAnswer: 3,
        category: 'Clinical',
        difficulty: 6,
        keyPoint: 'Rhabdomyolysis causes ATN via: myoglobin toxicity, cast formation, hypovolemia, and vasoconstriction. Triad: myalgia, weakness, dark urine. CK >1000.',
        reference: 'Brenner and Rector\'s The Kidney, 11th Edition'
      },
      {
        id: 'med6_3',
        question: 'A patient on long-term amiodarone develops thyroid dysfunction. Which type is more common?',
        options: ['Hyperthyroidism type 1', 'Hyperthyroidism type 2', 'Hypothyroidism', 'Both equally common'],
        correctAnswer: 2,
        category: 'Clinical',
        difficulty: 6,
        keyPoint: 'Amiodarone-induced hypothyroidism is more common (5-10% vs 2-3% hyperthyroidism). Type 1: excess iodine, Type 2: destructive thyroiditis.',
        reference: 'Williams Textbook of Endocrinology, 14th Edition'
      },
      {
        id: 'med6_4',
        question: 'What is the most specific antibody for systemic sclerosis (scleroderma)?',
        options: ['Anti-dsDNA', 'Anti-centromere', 'Anti-Scl-70 (anti-topoisomerase I)', 'Anti-Smith'],
        correctAnswer: 2,
        category: 'Clinical',
        difficulty: 6,
        keyPoint: 'Anti-Scl-70 specific for diffuse scleroderma with pulmonary fibrosis. Anti-centromere for limited (CREST syndrome). Anti-Smith for SLE.',
        reference: 'Rheumatology, Hochberg et al., 7th Edition'
      },
      {
        id: 'med6_5',
        question: 'A patient presents with the triad of hemolytic anemia, thrombocytopenia, and acute renal failure after recent diarrheal illness. What is the most likely diagnosis?',
        options: ['ITP', 'TTP', 'HUS', 'DIC'],
        correctAnswer: 2,
        category: 'Clinical',
        difficulty: 6,
        keyPoint: 'HUS: classic triad (hemolytic anemia, thrombocytopenia, AKI) + prodromal diarrhea (often E. coli O157:H7). TTP adds fever and neurologic symptoms.',
        reference: 'Hematology: Basic Principles and Practice, Hoffman, 8th Edition'
      }
    ]
  }
];

// ✅ Helper function to generate quiz based on level and number of questions
export function generateLevelBasedQuiz(level: number, questionCount: number): Quiz | null {
  const allQuestions = medicalQuizzes.flatMap(q => q.questions);
  const questionsAtLevel = allQuestions.filter(q => q.difficulty === level);
  
  if (questionsAtLevel.length < questionCount) {
    return null;
  }
  
  // Shuffle and take requested number
  const shuffled = questionsAtLevel.sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, questionCount);
  
  return {
    id: `custom-level-${level}-${Date.now()}`,
    title: `Level ${level} Challenge - ${questionCount} Questions`,
    category: 'Mixed Medical',
    difficulty: level <= 2 ? 'easy' : level <= 4 ? 'medium' : 'hard',
    level: level as any,
    timeLimit: questionCount * 2,
    questions: selectedQuestions
  };
}

// ✅ XP calculation based on performance
export function calculateXP(
  score: number,
  totalQuestions: number,
  level: number,
  confidenceAccuracy: number
): number {
  const baseXP = 10;
  const scorePercentage = (score / totalQuestions) * 100;
  
  // XP factors
  const scoreFactor = scorePercentage / 10; // 0-10
  const levelMultiplier = level; // 1-6
  const confidenceBonus = confidenceAccuracy >= 80 ? 1.2 : confidenceAccuracy >= 60 ? 1.1 : 1;
  
  const totalXP = Math.round(baseXP * scoreFactor * levelMultiplier * confidenceBonus);
  
  return Math.max(totalXP, 0);
}

// ✅ Determine rank based on XP
export function getRankFromXP(xp: number): 'Snake' | 'Lion' | 'Prince' | 'King' {
  if (xp >= 5000) return 'King';
  if (xp >= 2000) return 'Prince';
  if (xp >= 500) return 'Lion';
  return 'Snake';
}
