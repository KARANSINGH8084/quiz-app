// import { Quiz } from '../types';

// export const quizzes: Quiz[] = [
//   {
//     id: 'q1',
//     title: 'General Knowledge',
//     category: 'General',
//     difficulty: 'easy',
//     timeLimit: 10,
//     questions: [
//       {
//         id: 'q1_1',
//         question: 'What is the capital of France?',
//         options: ['London', 'Berlin', 'Paris', 'Madrid'],
//         correctAnswer: 2,
//         category: 'Geography'
//       },
//       {
//         id: 'q1_2',
//         question: 'How many continents are there?',
//         options: ['5', '6', '7', '8'],
//         correctAnswer: 2,
//         category: 'Geography'
//       },
//       {
//         id: 'q1_3',
//         question: 'What is the largest planet in our solar system?',
//         options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
//         correctAnswer: 2,
//         category: 'Science'
//       },
//       {
//         id: 'q1_4',
//         question: 'Who painted the Mona Lisa?',
//         options: ['Michelangelo', 'Leonardo da Vinci', 'Picasso', 'Van Gogh'],
//         correctAnswer: 1,
//         category: 'Art'
//       },
//       {
//         id: 'q1_5',
//         question: 'What is the smallest prime number?',
//         options: ['0', '1', '2', '3'],
//         correctAnswer: 2,
//         category: 'Math'
//       },
//       {
//         id: 'q1_6',
//         question: 'In which year did World War II end?',
//         options: ['1943', '1944', '1945', '1946'],
//         correctAnswer: 2,
//         category: 'History'
//       },
//       {
//         id: 'q1_7',
//         question: 'What is the chemical symbol for gold?',
//         options: ['Go', 'Gd', 'Au', 'Ag'],
//         correctAnswer: 2,
//         category: 'Science'
//       },
//       {
//         id: 'q1_8',
//         question: 'How many sides does a hexagon have?',
//         options: ['5', '6', '7', '8'],
//         correctAnswer: 1,
//         category: 'Math'
//       },
//       {
//         id: 'q1_9',
//         question: 'What is the largest ocean on Earth?',
//         options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
//         correctAnswer: 3,
//         category: 'Geography'
//       },
//       {
//         id: 'q1_10',
//         question: 'Who wrote "Romeo and Juliet"?',
//         options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
//         correctAnswer: 1,
//         category: 'Literature'
//       }
//     ]
//   },
//   {
//     id: 'q2',
//     title: 'Science Basics',
//     category: 'Science',
//     difficulty: 'medium',
//     timeLimit: 12,
//     questions: [
//       {
//         id: 'q2_1',
//         question: 'What is the speed of light?',
//         options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
//         correctAnswer: 0,
//         category: 'Physics'
//       },
//       {
//         id: 'q2_2',
//         question: 'What is the powerhouse of the cell?',
//         options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'],
//         correctAnswer: 1,
//         category: 'Biology'
//       },
//       {
//         id: 'q2_3',
//         question: 'What is H2O commonly known as?',
//         options: ['Hydrogen', 'Oxygen', 'Water', 'Peroxide'],
//         correctAnswer: 2,
//         category: 'Chemistry'
//       },
//       {
//         id: 'q2_4',
//         question: 'What planet is known as the Red Planet?',
//         options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
//         correctAnswer: 1,
//         category: 'Astronomy'
//       },
//       {
//         id: 'q2_5',
//         question: 'What is the hardest natural substance on Earth?',
//         options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
//         correctAnswer: 2,
//         category: 'Geology'
//       },
//       {
//         id: 'q2_6',
//         question: 'How many bones are in the adult human body?',
//         options: ['186', '206', '226', '246'],
//         correctAnswer: 1,
//         category: 'Biology'
//       },
//       {
//         id: 'q2_7',
//         question: 'What gas do plants absorb from the atmosphere?',
//         options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
//         correctAnswer: 2,
//         category: 'Biology'
//       },
//       {
//         id: 'q2_8',
//         question: 'What is the center of an atom called?',
//         options: ['Electron', 'Proton', 'Neutron', 'Nucleus'],
//         correctAnswer: 3,
//         category: 'Chemistry'
//       },
//       {
//         id: 'q2_9',
//         question: 'What is the boiling point of water at sea level?',
//         options: ['90°C', '100°C', '110°C', '120°C'],
//         correctAnswer: 1,
//         category: 'Physics'
//       },
//       {
//         id: 'q2_10',
//         question: 'What force keeps us on the ground?',
//         options: ['Magnetism', 'Friction', 'Gravity', 'Tension'],
//         correctAnswer: 2,
//         category: 'Physics'
//       }
//     ]
//   },
//   {
//     id: 'q3',
//     title: 'History Quiz',
//     category: 'History',
//     difficulty: 'medium',
//     timeLimit: 15,
//     questions: [
//       {
//         id: 'q3_1',
//         question: 'Who was the first President of the United States?',
//         options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'],
//         correctAnswer: 1,
//         category: 'History'
//       },
//       {
//         id: 'q3_2',
//         question: 'In which year did the Titanic sink?',
//         options: ['1910', '1911', '1912', '1913'],
//         correctAnswer: 2,
//         category: 'History'
//       },
//       {
//         id: 'q3_3',
//         question: 'Who discovered America?',
//         options: ['Christopher Columbus', 'Amerigo Vespucci', 'Leif Erikson', 'Ferdinand Magellan'],
//         correctAnswer: 0,
//         category: 'History'
//       },
//       {
//         id: 'q3_4',
//         question: 'What ancient wonder was located in Egypt?',
//         options: ['Hanging Gardens', 'Colossus of Rhodes', 'Great Pyramid', 'Lighthouse of Alexandria'],
//         correctAnswer: 2,
//         category: 'History'
//       },
//       {
//         id: 'q3_5',
//         question: 'Who was known as the Iron Lady?',
//         options: ['Queen Elizabeth', 'Margaret Thatcher', 'Angela Merkel', 'Indira Gandhi'],
//         correctAnswer: 1,
//         category: 'History'
//       },
//       {
//         id: 'q3_6',
//         question: 'In which year did World War I begin?',
//         options: ['1912', '1914', '1916', '1918'],
//         correctAnswer: 1,
//         category: 'History'
//       },
//       {
//         id: 'q3_7',
//         question: 'Who painted the Sistine Chapel ceiling?',
//         options: ['Leonardo da Vinci', 'Raphael', 'Michelangelo', 'Donatello'],
//         correctAnswer: 2,
//         category: 'Art History'
//       },
//       {
//         id: 'q3_8',
//         question: 'What was the name of the first artificial satellite?',
//         options: ['Apollo 1', 'Sputnik 1', 'Explorer 1', 'Vostok 1'],
//         correctAnswer: 1,
//         category: 'History'
//       },
//       {
//         id: 'q3_9',
//         question: 'Who wrote the Declaration of Independence?',
//         options: ['George Washington', 'Benjamin Franklin', 'Thomas Jefferson', 'John Adams'],
//         correctAnswer: 2,
//         category: 'History'
//       },
//       {
//         id: 'q3_10',
//         question: 'What empire was ruled by Julius Caesar?',
//         options: ['Greek Empire', 'Roman Empire', 'Persian Empire', 'Byzantine Empire'],
//         correctAnswer: 1,
//         category: 'History'
//       }
//     ]
//   },
//   {
//     id: 'q4',
//     title: 'Technology Trivia',
//     category: 'Technology',
//     difficulty: 'hard',
//     timeLimit: 12,
//     questions: [
//       {
//         id: 'q4_1',
//         question: 'Who is considered the father of computers?',
//         options: ['Alan Turing', 'Charles Babbage', 'Steve Jobs', 'Bill Gates'],
//         correctAnswer: 1,
//         category: 'Technology'
//       },
//       {
//         id: 'q4_2',
//         question: 'What does HTTP stand for?',
//         options: ['HyperText Transfer Protocol', 'High Tech Transfer Protocol', 'HyperText Translation Program', 'Home Tool Transfer Protocol'],
//         correctAnswer: 0,
//         category: 'Technology'
//       },
//       {
//         id: 'q4_3',
//         question: 'What year was the first iPhone released?',
//         options: ['2005', '2006', '2007', '2008'],
//         correctAnswer: 2,
//         category: 'Technology'
//       },
//       {
//         id: 'q4_4',
//         question: 'What does AI stand for?',
//         options: ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Integration', 'Applied Innovation'],
//         correctAnswer: 1,
//         category: 'Technology'
//       },
//       {
//         id: 'q4_5',
//         question: 'Who founded Microsoft?',
//         options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Elon Musk'],
//         correctAnswer: 1,
//         category: 'Technology'
//       },
//       {
//         id: 'q4_6',
//         question: 'What is the most popular programming language in 2025?',
//         options: ['Java', 'Python', 'JavaScript', 'C++'],
//         correctAnswer: 1,
//         category: 'Technology'
//       },
//       {
//         id: 'q4_7',
//         question: 'What does CPU stand for?',
//         options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'],
//         correctAnswer: 0,
//         category: 'Technology'
//       },
//       {
//         id: 'q4_8',
//         question: 'What company developed Android OS?',
//         options: ['Apple', 'Microsoft', 'Google', 'Samsung'],
//         correctAnswer: 2,
//         category: 'Technology'
//       },
//       {
//         id: 'q4_9',
//         question: 'What does RAM stand for?',
//         options: ['Random Access Memory', 'Read Access Memory', 'Rapid Application Memory', 'Runtime Application Memory'],
//         correctAnswer: 0,
//         category: 'Technology'
//       },
//       {
//         id: 'q4_10',
//         question: 'What is the largest social media platform?',
//         options: ['Twitter', 'Instagram', 'Facebook', 'TikTok'],
//         correctAnswer: 2,
//         category: 'Technology'
//       }
//     ]
//   }
// ];


import { Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    id: 'm1',
    title: 'Human Anatomy',
    category: 'Anatomy',
    difficulty: 'easy',
    timeLimit: 12,
    questions: [
      {
        id: 'm1_1',
        question: 'Which organ pumps blood throughout the body?',
        options: ['Brain', 'Heart', 'Liver', 'Lungs'],
        correctAnswer: 1,
        category: 'Anatomy',
        image: 'https://picsum.photos/seed/heart/400/300',
        imageTitle: 'Human Heart'
      },
      {
        id: 'm1_2',
        question: 'Which bone is known as the thigh bone?',
        options: ['Femur', 'Tibia', 'Fibula', 'Humerus'],
        correctAnswer: 0,
        category: 'Anatomy',
        image: 'https://picsum.photos/seed/femur/400/300',
        imageTitle: 'Femur Bone'
      },
      {
        id: 'm1_3',
        question: 'Which organ is responsible for filtering blood?',
        options: ['Kidney', 'Lung', 'Stomach', 'Skin'],
        correctAnswer: 0,
        category: 'Anatomy',
        image: 'https://picsum.photos/seed/kidney/400/300',
        imageTitle: 'Kidneys'
      },
      {
        id: 'm1_4',
        question: 'Which system controls body movements?',
        options: ['Digestive system', 'Muscular system', 'Respiratory system', 'Circulatory system'],
        correctAnswer: 1,
        category: 'Anatomy',
        image: 'https://picsum.photos/seed/muscle/400/300',
        imageTitle: 'Muscular System'
      },
      {
        id: 'm1_5',
        question: 'Which organ is responsible for producing insulin?',
        options: ['Pancreas', 'Liver', 'Gallbladder', 'Kidney'],
        correctAnswer: 0,
        category: 'Anatomy',
        image: 'https://picsum.photos/seed/pancreas/400/300',
        imageTitle: 'Pancreas'
      }
    ]
  },

  {
    id: 'm2',
    title: 'Medical Science Basics',
    category: 'Medicine',
    difficulty: 'medium',
    timeLimit: 12,
    questions: [
      {
        id: 'm2_1',
        question: 'Which disease is caused by the deficiency of insulin?',
        options: ['Diabetes', 'Cancer', 'Hypertension', 'Asthma'],
        correctAnswer: 0,
        category: 'Medicine',
        image: 'https://picsum.photos/seed/diabetes/400/300',
        imageTitle: 'Diabetes Awareness'
      },
      {
        id: 'm2_2',
        question: 'What is the normal body temperature in Celsius?',
        options: ['36°C', '37°C', '38°C', '39°C'],
        correctAnswer: 1,
        category: 'Medicine',
        image: 'https://picsum.photos/seed/temperature/400/300',
        imageTitle: 'Body Temperature'
      },
      {
        id: 'm2_3',
        question: 'What is the liquid component of blood called?',
        options: ['Plasma', 'Platelets', 'RBC', 'WBC'],
        correctAnswer: 0,
        category: 'Medicine',
        image: 'https://picsum.photos/seed/blood/400/300',
        imageTitle: 'Blood Plasma'
      },
      {
        id: 'm2_4',
        question: 'Which vitamin is produced when the skin is exposed to sunlight?',
        options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
        correctAnswer: 3,
        category: 'Medicine',
        image: 'https://picsum.photos/seed/vitamind/400/300',
        imageTitle: 'Vitamin D'
      },
      {
        id: 'm2_5',
        question: 'Which blood group is known as universal donor?',
        options: ['A+', 'B-', 'O-', 'AB+'],
        correctAnswer: 2,
        category: 'Medicine',
        image: 'https://picsum.photos/seed/blooddonor/400/300',
        imageTitle: 'Universal Donor (O-)'
      }
    ]
  },

  {
    id: 'm3',
    title: 'Biology & Human Body',
    category: 'Biology',
    difficulty: 'medium',
    timeLimit: 15,
    questions: [
      {
        id: 'm3_1',
        question: 'What is the basic unit of life?',
        options: ['Cell', 'Tissue', 'Organ', 'Organism'],
        correctAnswer: 0,
        category: 'Biology',
        image: 'https://picsum.photos/seed/cell/400/300',
        imageTitle: 'Human Cell'
      },
      {
        id: 'm3_2',
        question: 'Which molecule carries genetic information?',
        options: ['RNA', 'DNA', 'Protein', 'Lipids'],
        correctAnswer: 1,
        category: 'Biology',
        image: 'https://picsum.photos/seed/dna/400/300',
        imageTitle: 'DNA Structure'
      },
      {
        id: 'm3_3',
        question: 'Which gas do humans exhale?',
        options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Helium'],
        correctAnswer: 1,
        category: 'Biology',
        image: 'https://picsum.photos/seed/co2/400/300',
        imageTitle: 'Carbon Dioxide'
      },
      {
        id: 'm3_4',
        question: 'Which part of the brain controls balance?',
        options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Thalamus'],
        correctAnswer: 1,
        category: 'Biology',
        image: 'https://picsum.photos/seed/brain/400/300',
        imageTitle: 'Human Brain'
      },
      {
        id: 'm3_5',
        question: 'What is the largest organ in the human body?',
        options: ['Heart', 'Liver', 'Skin', 'Brain'],
        correctAnswer: 2,
        category: 'Biology',
        image: 'https://picsum.photos/seed/skin/400/300',
        imageTitle: 'Human Skin'
      }
    ]
  },

  {
    id: 'm4',
    title: 'Nursing & Health Care',
    category: 'Nursing',
    difficulty: 'hard',
    timeLimit: 15,
    questions: [
      {
        id: 'm4_1',
        question: 'What is the normal pulse rate for adults?',
        options: ['60-100 bpm', '30-50 bpm', '100-150 bpm', '40-90 bpm'],
        correctAnswer: 0,
        category: 'Nursing',
        image: 'https://picsum.photos/seed/pulse/400/300',
        imageTitle: 'Heart Pulse'
      },
      {
        id: 'm4_2',
        question: 'Which organ detoxifies harmful substances in the body?',
        options: ['Liver', 'Heart', 'Kidney', 'Lungs'],
        correctAnswer: 0,
        category: 'Nursing',
        image: 'https://picsum.photos/seed/liver/400/300',
        imageTitle: 'Liver Detox'
      },
      {
        id: 'm4_3',
        question: 'Which hormone regulates blood sugar?',
        options: ['Adrenaline', 'Insulin', 'Thyroxine', 'Estrogen'],
        correctAnswer: 1,
        category: 'Nursing',
        image: 'https://picsum.photos/seed/insulin/400/300',
        imageTitle: 'Insulin'
      },
      {
        id: 'm4_4',
        question: 'CPR stands for?',
        options: [
          'Cardio Pressure Rescue',
          'Cardio Pulmonary Resuscitation',
          'Chest Pulse Restoration',
          'Cellular Protein Response'
        ],
        correctAnswer: 1,
        category: 'Nursing',
        image: 'https://picsum.photos/seed/cpr/400/300',
        imageTitle: 'CPR Technique'
      },
      {
        id: 'm4_5',
        question: 'What instrument measures blood pressure?',
        options: ['Thermometer', 'Sphygmomanometer', 'Stethoscope', 'ECG Machine'],
        correctAnswer: 1,
        category: 'Nursing',
        image: 'https://picsum.photos/seed/bp/400/300',
        imageTitle: 'Blood Pressure Monitor'
      }
    ]
  }
];
