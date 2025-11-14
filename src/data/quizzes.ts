// ✅ UPDATED: Medical science practice quizzes
import { Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    id: 'practice1',
    title: 'Basic Medical Terminology',
    category: 'Medical Basics',
    difficulty: 'easy',
    level: 1,
    timeLimit: 10,
    questions: [
      {
        id: 'p1_1',
        question: 'What does the prefix "hyper-" mean?',
        options: ['Below normal', 'Above normal', 'Within', 'Around'],
        correctAnswer: 1,
        category: 'Medical Terminology',
        difficulty: 1,
        keyPoint: '"Hyper-" means excessive or above normal, as in hypertension (high blood pressure) or hyperglycemia (high blood sugar).',
        reference: 'Medical Terminology: A Short Course, Chabner'
      },
      {
        id: 'p1_2',
        question: 'What is the medical term for inflammation of the liver?',
        options: ['Nephritis', 'Hepatitis', 'Gastritis', 'Colitis'],
        correctAnswer: 1,
        category: 'Medical Terminology',
        difficulty: 1,
        keyPoint: 'Hepatitis refers to liver inflammation. The suffix "-itis" always means inflammation.',
        reference: 'Medical Terminology Systems, Gylys & Masters'
      },
      {
        id: 'p1_3',
        question: 'What does "bradycardia" mean?',
        options: ['Fast heart rate', 'Slow heart rate', 'Irregular heart rate', 'Stopped heart rate'],
        correctAnswer: 1,
        category: 'Cardiology',
        difficulty: 1,
        keyPoint: '"Brady-" means slow. Bradycardia is a heart rate below 60 bpm in adults.',
        reference: 'ECG Interpretation Made Incredibly Easy'
      },
      {
        id: 'p1_4',
        question: 'What is the normal body temperature in Celsius?',
        options: ['35°C', '37°C', '39°C', '40°C'],
        correctAnswer: 1,
        category: 'Physiology',
        difficulty: 1,
        keyPoint: 'Normal body temperature is approximately 37°C (98.6°F), with slight variations throughout the day.',
        reference: 'Guyton and Hall Textbook of Medical Physiology'
      },
      {
        id: 'p1_5',
        question: 'What does "NPO" stand for in medical orders?',
        options: ['Nothing by mouth', 'Not per order', 'No pain observed', 'Normal postoperative'],
        correctAnswer: 0,
        category: 'Clinical Practice',
        difficulty: 1,
        keyPoint: 'NPO (nil per os) means nothing by mouth - no food or drink, typically before surgery or procedures.',
        reference: 'Clinical Nursing Skills & Techniques, Perry & Potter'
      },
      {
        id: 'p1_6',
        question: 'Which blood type is considered the universal donor?',
        options: ['A+', 'B+', 'AB+', 'O-'],
        correctAnswer: 3,
        category: 'Hematology',
        difficulty: 1,
        keyPoint: 'O- blood has no A, B, or Rh antigens, making it compatible with all blood types in emergencies.',
        reference: 'Clinical Hematology: Theory and Procedures, Harmening'
      },
      {
        id: 'p1_7',
        question: 'What is the abbreviation for "three times a day"?',
        options: ['BID', 'TID', 'QID', 'QD'],
        correctAnswer: 1,
        category: 'Pharmacology',
        difficulty: 1,
        keyPoint: 'TID (ter in die) means three times daily. BID = twice daily, QID = four times daily, QD = once daily.',
        reference: 'Medical Abbreviations: 32,000 Conveniences at the Expense of Communication'
      },
      {
        id: 'p1_8',
        question: 'What is the primary function of red blood cells?',
        options: ['Fight infection', 'Oxygen transport', 'Blood clotting', 'Produce antibodies'],
        correctAnswer: 1,
        category: 'Physiology',
        difficulty: 1,
        keyPoint: 'Red blood cells (erythrocytes) contain hemoglobin which binds and transports oxygen to tissues.',
        reference: 'Vander\'s Human Physiology'
      },
      {
        id: 'p1_9',
        question: 'What does "stat" mean in medical orders?',
        options: ['Slowly', 'Immediately', 'Daily', 'As needed'],
        correctAnswer: 1,
        category: 'Clinical Practice',
        difficulty: 1,
        keyPoint: 'STAT (statim) means immediately - highest priority for urgent situations.',
        reference: 'Medical Terminology for Health Professions, Ehrlich'
      },
      {
        id: 'p1_10',
        question: 'What is the medical term for high blood pressure?',
        options: ['Hypotension', 'Hypertension', 'Normotension', 'Hyperpression'],
        correctAnswer: 1,
        category: 'Cardiology',
        difficulty: 1,
        keyPoint: 'Hypertension is defined as BP ≥140/90 mmHg. It is a major risk factor for cardiovascular disease.',
        reference: 'Harrison\'s Principles of Internal Medicine'
      }
    ]
  },
  {
    id: 'practice2',
    title: 'Human Anatomy Essentials',
    category: 'Anatomy',
    difficulty: 'medium',
    level: 2,
    timeLimit: 12,
    questions: [
      {
        id: 'p2_1',
        question: 'Which artery supplies blood to the heart muscle?',
        options: ['Pulmonary artery', 'Aorta', 'Coronary artery', 'Carotid artery'],
        correctAnswer: 2,
        category: 'Cardiology',
        difficulty: 2,
        keyPoint: 'Coronary arteries (right and left) supply oxygenated blood to the myocardium. Blockage causes myocardial infarction.',
        reference: 'Gray\'s Anatomy for Students'
      },
      {
        id: 'p2_2',
        question: 'How many lobes does the right lung have?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 2,
        category: 'Respiratory',
        difficulty: 2,
        keyPoint: 'Right lung has 3 lobes (upper, middle, lower). Left lung has 2 lobes (upper, lower) to accommodate the heart.',
        reference: 'Clinically Oriented Anatomy, Moore'
      },
      {
        id: 'p2_3',
        question: 'What is the largest gland in the human body?',
        options: ['Pancreas', 'Thyroid', 'Liver', 'Pituitary'],
        correctAnswer: 2,
        category: 'Anatomy',
        difficulty: 2,
        keyPoint: 'The liver weighs approximately 1.5 kg and performs over 500 functions including metabolism, detoxification, and bile production.',
        reference: 'Sobotta Atlas of Human Anatomy'
      },
      {
        id: 'p2_4',
        question: 'Which cranial nerve controls eye movement?',
        options: ['Optic nerve (II)', 'Oculomotor nerve (III)', 'Olfactory nerve (I)', 'Trigeminal nerve (V)'],
        correctAnswer: 1,
        category: 'Neurology',
        difficulty: 2,
        keyPoint: 'CN III (oculomotor) controls most eye movements, pupil constriction, and eyelid elevation. Also CN IV and VI control eye movement.',
        reference: 'Clinical Neuroanatomy Made Ridiculously Simple'
      },
      {
        id: 'p2_5',
        question: 'Where is insulin produced?',
        options: ['Liver', 'Pancreas', 'Adrenal gland', 'Thyroid'],
        correctAnswer: 1,
        category: 'Endocrinology',
        difficulty: 2,
        keyPoint: 'Insulin is produced by beta cells in the islets of Langerhans in the pancreas. It regulates blood glucose levels.',
        reference: 'Williams Textbook of Endocrinology'
      },
      {
        id: 'p2_6',
        question: 'What is the functional unit of the kidney?',
        options: ['Glomerulus', 'Nephron', 'Ureter', 'Bowman\'s capsule'],
        correctAnswer: 1,
        category: 'Renal',
        difficulty: 2,
        keyPoint: 'Each kidney contains approximately 1 million nephrons, which filter blood and produce urine.',
        reference: 'Renal Physiology, Koeppen & Stanton'
      },
      {
        id: 'p2_7',
        question: 'Which valve is located between the left atrium and left ventricle?',
        options: ['Tricuspid valve', 'Pulmonary valve', 'Mitral valve', 'Aortic valve'],
        correctAnswer: 2,
        category: 'Cardiology',
        difficulty: 2,
        keyPoint: 'The mitral (bicuspid) valve prevents backflow from left ventricle to left atrium during systole.',
        reference: 'Netter\'s Atlas of Human Anatomy'
      },
      {
        id: 'p2_8',
        question: 'What type of joint is the shoulder?',
        options: ['Hinge joint', 'Ball and socket joint', 'Pivot joint', 'Saddle joint'],
        correctAnswer: 1,
        category: 'Orthopedics',
        difficulty: 2,
        keyPoint: 'The glenohumeral (shoulder) joint is a ball-and-socket joint allowing wide range of motion but prone to dislocation.',
        reference: 'Clinical Anatomy by Regions, Snell'
      },
      {
        id: 'p2_9',
        question: 'Which part of the brain controls balance and coordination?',
        options: ['Cerebrum', 'Cerebellum', 'Medulla oblongata', 'Hypothalamus'],
        correctAnswer: 1,
        category: 'Neurology',
        difficulty: 2,
        keyPoint: 'The cerebellum coordinates voluntary movements, maintains posture and balance. Damage causes ataxia.',
        reference: 'Neuroanatomy Through Clinical Cases, Blumenfeld'
      },
      {
        id: 'p2_10',
        question: 'How many cervical vertebrae are in the human spine?',
        options: ['5', '7', '12', '5'],
        correctAnswer: 1,
        category: 'Anatomy',
        difficulty: 2,
        keyPoint: 'There are 7 cervical, 12 thoracic, 5 lumbar vertebrae, plus sacrum and coccyx.',
        reference: 'Grant\'s Atlas of Anatomy'
      }
    ]
  },
  {
    id: 'practice3',
    title: 'Medical Microbiology',
    category: 'Microbiology',
    difficulty: 'medium',
    level: 3,
    timeLimit: 15,
    questions: [
      {
        id: 'p3_1',
        question: 'Which organism causes tuberculosis?',
        options: ['Mycobacterium leprae', 'Mycobacterium tuberculosis', 'Streptococcus pneumoniae', 'Staphylococcus aureus'],
        correctAnswer: 1,
        category: 'Infectious Disease',
        difficulty: 3,
        keyPoint: 'M. tuberculosis is an acid-fast bacillus that primarily affects lungs. Diagnosed by Ziehl-Neelsen stain and culture.',
        reference: 'Medical Microbiology, Murray'
      },
      {
        id: 'p3_2',
        question: 'What is the most common cause of community-acquired pneumonia?',
        options: ['Haemophilus influenzae', 'Klebsiella pneumoniae', 'Streptococcus pneumoniae', 'Mycoplasma pneumoniae'],
        correctAnswer: 2,
        category: 'Respiratory',
        difficulty: 3,
        keyPoint: 'S. pneumoniae (pneumococcus) causes 30-50% of CAP. Vaccine available for high-risk groups.',
        reference: 'Mandell, Douglas, and Bennett\'s Infectious Disease'
      },
      {
        id: 'p3_3',
        question: 'Which virus causes chickenpox?',
        options: ['Herpes simplex virus', 'Varicella-zoster virus', 'Epstein-Barr virus', 'Cytomegalovirus'],
        correctAnswer: 1,
        category: 'Virology',
        difficulty: 3,
        keyPoint: 'VZV causes chickenpox (primary infection) and shingles (reactivation). Highly contagious via respiratory droplets.',
        reference: 'Principles of Virology, Flint et al.'
      },
      {
        id: 'p3_4',
        question: 'What is the Gram stain result for E. coli?',
        options: ['Gram-positive cocci', 'Gram-negative rod', 'Gram-positive rod', 'Gram-negative cocci'],
        correctAnswer: 1,
        category: 'Bacteriology',
        difficulty: 3,
        keyPoint: 'E. coli is a Gram-negative bacillus, common cause of UTI, gastroenteritis, and neonatal meningitis.',
        reference: 'Jawetz, Melnick & Adelberg\'s Medical Microbiology'
      },
      {
        id: 'p3_5',
        question: 'Which antibiotic class inhibits bacterial cell wall synthesis?',
        options: ['Tetracyclines', 'Macrolides', 'Beta-lactams', 'Aminoglycosides'],
        correctAnswer: 2,
        category: 'Pharmacology',
        difficulty: 3,
        keyPoint: 'Beta-lactams (penicillins, cephalosporins) inhibit peptidoglycan synthesis in bacterial cell walls.',
        reference: 'Basic and Clinical Pharmacology, Katzung'
      },
      {
        id: 'p3_6',
        question: 'What disease is caused by Plasmodium species?',
        options: ['Typhoid', 'Malaria', 'Dengue', 'Yellow fever'],
        correctAnswer: 1,
        category: 'Parasitology',
        difficulty: 3,
        keyPoint: 'Malaria is caused by Plasmodium parasites transmitted by Anopheles mosquitoes. Major global health burden.',
        reference: 'Medical Parasitology, Markell & Voge'
      },
      {
        id: 'p3_7',
        question: 'Which organism is associated with gastric ulcers?',
        options: ['E. coli', 'Helicobacter pylori', 'Salmonella typhi', 'Campylobacter jejuni'],
        correctAnswer: 1,
        category: 'Gastroenterology',
        difficulty: 3,
        keyPoint: 'H. pylori colonizes gastric mucosa causing chronic gastritis, peptic ulcers, and increased gastric cancer risk.',
        reference: 'Sleisenger and Fordtran\'s GI Disease'
      },
      {
        id: 'p3_8',
        question: 'What is the incubation period of HIV before AIDS develops (untreated)?',
        options: ['1-2 months', '6-12 months', '2-5 years', '8-10 years'],
        correctAnswer: 3,
        category: 'Virology',
        difficulty: 3,
        keyPoint: 'Without treatment, HIV typically progresses to AIDS in 8-10 years. HAART can prevent progression indefinitely.',
        reference: 'The HIV Book, Hoffmann & Rockstroh'
      },
      {
        id: 'p3_9',
        question: 'Which fungus commonly causes oral thrush?',
        options: ['Aspergillus fumigatus', 'Candida albicans', 'Cryptococcus neoformans', 'Histoplasma capsulatum'],
        correctAnswer: 1,
        category: 'Mycology',
        difficulty: 3,
        keyPoint: 'C. albicans is the most common cause of oral and vaginal candidiasis, especially in immunocompromised patients.',
        reference: 'Clinical Mycology, Anaissie et al.'
      },
      {
        id: 'p3_10',
        question: 'What is the vector for Lyme disease?',
        options: ['Mosquito', 'Tick', 'Flea', 'Sandfly'],
        correctAnswer: 1,
        category: 'Infectious Disease',
        difficulty: 3,
        keyPoint: 'Lyme disease is caused by Borrelia burgdorferi, transmitted by Ixodes ticks. Classic sign: erythema migrans rash.',
        reference: 'Hunter\'s Tropical Medicine and Infectious Disease'
      }
    ]
  }
];
