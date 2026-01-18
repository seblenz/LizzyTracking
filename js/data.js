/**
 * LizzyTracker - Default Data
 * Contains prenatal visit schedules, baby development info, checklists, and pediatric visits
 */

const AppData = {
    // Baby size comparisons by week
    babySizes: {
        4: { icon: '🌱', text: 'a poppy seed' },
        5: { icon: '🫘', text: 'a sesame seed' },
        6: { icon: '🫛', text: 'a lentil' },
        7: { icon: '🫐', text: 'a blueberry' },
        8: { icon: '🫒', text: 'a kidney bean' },
        9: { icon: '🍇', text: 'a grape' },
        10: { icon: '🫒', text: 'a kumquat' },
        11: { icon: '🍓', text: 'a fig' },
        12: { icon: '🍋', text: 'a lime' },
        13: { icon: '🍋', text: 'a lemon' },
        14: { icon: '🍊', text: 'a nectarine' },
        15: { icon: '🍎', text: 'an apple' },
        16: { icon: '🥑', text: 'an avocado' },
        17: { icon: '🍐', text: 'a pear' },
        18: { icon: '🫑', text: 'a bell pepper' },
        19: { icon: '🥭', text: 'a mango' },
        20: { icon: '🍌', text: 'a banana' },
        21: { icon: '🥕', text: 'a carrot' },
        22: { icon: '🥒', text: 'a spaghetti squash' },
        23: { icon: '🥭', text: 'a large mango' },
        24: { icon: '🌽', text: 'an ear of corn' },
        25: { icon: '🥬', text: 'a rutabaga' },
        26: { icon: '🥬', text: 'a head of lettuce' },
        27: { icon: '🥦', text: 'a cauliflower' },
        28: { icon: '🍆', text: 'an eggplant' },
        29: { icon: '🎃', text: 'an acorn squash' },
        30: { icon: '🥬', text: 'a cabbage' },
        31: { icon: '🥥', text: 'a coconut' },
        32: { icon: '🥒', text: 'a squash' },
        33: { icon: '🍍', text: 'a pineapple' },
        34: { icon: '🍈', text: 'a cantaloupe' },
        35: { icon: '🍈', text: 'a honeydew melon' },
        36: { icon: '🥬', text: 'a head of romaine lettuce' },
        37: { icon: '🥬', text: 'a bunch of Swiss chard' },
        38: { icon: '🎃', text: 'a mini pumpkin' },
        39: { icon: '🍉', text: 'a small watermelon' },
        40: { icon: '🎃', text: 'a pumpkin' }
    },

    // Week-by-week pregnancy information
    weeklyInfo: {
        4: {
            development: [
                'The embryo is implanting in the uterine wall',
                'The amniotic sac and yolk sac are forming',
                'The neural tube is beginning to form'
            ],
            symptoms: [
                'Possible implantation bleeding',
                'Tender or swollen breasts',
                'Fatigue',
                'Mild cramping'
            ],
            tips: [
                'Start taking prenatal vitamins if you haven\'t already',
                'Avoid alcohol, smoking, and certain medications',
                'Schedule your first prenatal appointment'
            ]
        },
        5: {
            development: [
                'The heart is beginning to form and may start beating',
                'The neural tube is developing into the brain and spinal cord',
                'Arm and leg buds are appearing'
            ],
            symptoms: [
                'Morning sickness may begin',
                'Frequent urination',
                'Mood swings',
                'Heightened sense of smell'
            ],
            tips: [
                'Eat small, frequent meals to combat nausea',
                'Stay hydrated',
                'Get plenty of rest'
            ]
        },
        6: {
            development: [
                'The heart is now beating at about 100-160 beats per minute',
                'Facial features are starting to form',
                'The neural tube closes'
            ],
            symptoms: [
                'Morning sickness may intensify',
                'Breast tenderness',
                'Fatigue',
                'Food aversions'
            ],
            tips: [
                'Try ginger or peppermint for nausea',
                'Avoid strong odors if they trigger nausea',
                'Start researching prenatal care providers'
            ]
        },
        7: {
            development: [
                'Brain cells are generating at 100 per minute',
                'Arms and legs are growing longer',
                'Hands and feet are forming'
            ],
            symptoms: [
                'Continued morning sickness',
                'Increased saliva production',
                'Constipation may begin',
                'Skin changes'
            ],
            tips: [
                'Eat fiber-rich foods to prevent constipation',
                'Continue taking prenatal vitamins',
                'Get adequate sleep'
            ]
        },
        8: {
            development: [
                'All major organs have begun to form',
                'Fingers and toes are forming',
                'The embryo is now called a fetus',
                'Heartbeat may be visible on ultrasound'
            ],
            symptoms: [
                'Morning sickness may peak',
                'Bloating',
                'Heightened emotions',
                'Vivid dreams'
            ],
            tips: [
                'Your first prenatal visit is typically this week',
                'Discuss genetic testing options with your provider',
                'Start photographing your belly for memories'
            ]
        },
        9: {
            development: [
                'Baby is moving, though you can\'t feel it yet',
                'Essential organs are continuing to develop',
                'Teeth buds are forming under the gums'
            ],
            symptoms: [
                'Continued fatigue',
                'Breast growth',
                'Waistline may start thickening',
                'Mood swings'
            ],
            tips: [
                'Invest in comfortable bras',
                'Stay active with gentle exercise',
                'Discuss workplace accommodations if needed'
            ]
        },
        10: {
            development: [
                'Vital organs are fully formed and beginning to function',
                'Fingernails and hair are starting to grow',
                'Baby can swallow and kick'
            ],
            symptoms: [
                'Morning sickness may begin to ease',
                'Visible veins due to increased blood volume',
                'Round ligament pain may begin'
            ],
            tips: [
                'Start thinking about how to announce your pregnancy',
                'Consider your maternity leave options',
                'Stay hydrated and eat well'
            ]
        },
        11: {
            development: [
                'Baby\'s head makes up half their body length',
                'Tooth buds, hair follicles, and nail beds are forming',
                'Baby can open and close their fists'
            ],
            symptoms: [
                'Nausea may be decreasing',
                'Less frequent urination temporarily',
                'Leg cramps may occur',
                'Possible changes in hair and nails'
            ],
            tips: [
                'Start moisturizing your belly to prevent stretch marks',
                'Research childbirth classes',
                'Begin thinking about nursery plans'
            ]
        },
        12: {
            development: [
                'Baby\'s reflexes are developing',
                'Intestines are moving into the abdominal cavity',
                'Baby can suck their thumb',
                'Vocal cords are forming'
            ],
            symptoms: [
                'End of first trimester',
                'Energy may be returning',
                'Decreased nausea for many',
                'Visible baby bump may appear'
            ],
            tips: [
                'This is typically when NT scan is performed',
                'Many couples announce pregnancy now',
                'Start researching pediatricians'
            ]
        },
        13: {
            development: [
                'Baby can make facial expressions',
                'Fingerprints are forming',
                'Bones are hardening',
                'Baby is producing urine'
            ],
            symptoms: [
                'Second trimester begins - often called the "honeymoon period"',
                'Increased energy',
                'Reduced nausea',
                'Growing belly'
            ],
            tips: [
                'Great time to travel if you\'re feeling well',
                'Consider maternity clothes shopping',
                'Start gentle exercise routine'
            ]
        },
        14: {
            development: [
                'Baby can squint, frown, and grimace',
                'Kidneys are producing urine',
                'Baby may be sucking their thumb'
            ],
            symptoms: [
                'Increased appetite',
                'Round ligament pain',
                'Less fatigue',
                'Possible nosebleeds or gum bleeding'
            ],
            tips: [
                'Maintain good dental hygiene',
                'Continue regular exercise',
                'Start sleeping on your side'
            ]
        },
        15: {
            development: [
                'Baby can sense light through closed eyelids',
                'Bones are becoming harder',
                'Baby is practicing breathing movements'
            ],
            symptoms: [
                'Possible first flutters of movement ("quickening")',
                'Stuffy nose',
                'Increased libido for some',
                'Growing belly'
            ],
            tips: [
                'Pay attention for baby\'s first movements',
                'Stay active but don\'t overexert',
                'Consider joining a prenatal group'
            ]
        },
        16: {
            development: [
                'Baby can hear your voice',
                'Eyes are moving',
                'Facial muscles are developing',
                'Baby is about 4-5 inches long'
            ],
            symptoms: [
                'Baby kicks may become noticeable',
                'Backaches',
                'Constipation',
                'Visible veins'
            ],
            tips: [
                'Start talking and singing to your baby',
                'Register for daycare if waitlists are long',
                'Consider a pregnancy pillow for better sleep'
            ]
        },
        17: {
            development: [
                'Fat is beginning to form under baby\'s skin',
                'Sweat glands are developing',
                'Baby\'s movements are becoming more coordinated'
            ],
            symptoms: [
                'Increased vaginal discharge',
                'Vivid dreams',
                'Itchy skin on growing belly',
                'Possible sciatic nerve pain'
            ],
            tips: [
                'Keep skin moisturized',
                'Stay hydrated',
                'Practice good posture'
            ]
        },
        18: {
            development: [
                'Baby\'s ears are in their final position',
                'Myelin is forming around nerves',
                'If female, uterus and fallopian tubes are formed'
            ],
            symptoms: [
                'Feeling baby\'s movements clearly',
                'Dizziness when changing positions',
                'Leg cramps',
                'Edema (swelling) may begin'
            ],
            tips: [
                'Elevate feet when resting',
                'Wear comfortable shoes',
                'Continue eating well and staying hydrated'
            ]
        },
        19: {
            development: [
                'Vernix caseosa (protective coating) is forming',
                'Brain is designating areas for senses',
                'Baby can hear external sounds'
            ],
            symptoms: [
                'Hip pain',
                'Skin changes like darkening patches',
                'Lower back pain',
                'Increased appetite'
            ],
            tips: [
                'Anatomy scan is typically around this time',
                'Start thinking about baby names',
                'Consider a babymoon trip'
            ]
        },
        20: {
            development: [
                'You\'re halfway there!',
                'Baby weighs about 10 ounces',
                'Baby can taste what you eat through amniotic fluid',
                'Developing sleep and wake cycles'
            ],
            symptoms: [
                'Clear feeling of baby movements',
                'Shortness of breath',
                'Heartburn',
                'Braxton Hicks contractions may begin'
            ],
            tips: [
                'Anatomy scan if not done yet',
                'Find out baby\'s sex if you want to know',
                'Start working on the nursery'
            ]
        },
        21: {
            development: [
                'Baby\'s movements are well-coordinated',
                'Eyebrows and eyelids are fully developed',
                'Baby is swallowing amniotic fluid'
            ],
            symptoms: [
                'Varicose veins may appear',
                'Stretch marks may become visible',
                'Increased fetal movement',
                'Spider veins'
            ],
            tips: [
                'Research cord blood banking options',
                'Consider hiring a doula',
                'Start perineal massage if recommended'
            ]
        },
        22: {
            development: [
                'Baby looks like a miniature newborn',
                'Lips and eyelids are more distinct',
                'Baby\'s grip is getting stronger'
            ],
            symptoms: [
                'Belly button may pop out',
                'Hemorrhoids',
                'Increased hair and nail growth',
                'Linea nigra may appear'
            ],
            tips: [
                'Stay consistent with prenatal appointments',
                'Keep tracking baby movements',
                'Start researching birthing options'
            ]
        },
        23: {
            development: [
                'Skin is saggy as baby hasn\'t filled out with fat yet',
                'Hearing is more developed',
                'Baby can feel movements'
            ],
            symptoms: [
                'Swollen feet and ankles',
                'Back pain',
                'Pregnancy brain (forgetfulness)',
                'Snoring'
            ],
            tips: [
                'Tour the hospital or birthing center',
                'Start writing your birth plan',
                'Consider taking childbirth classes'
            ]
        },
        24: {
            development: [
                'Baby could survive outside womb with intensive care',
                'Lungs are developing surfactant',
                'Face is fully formed'
            ],
            symptoms: [
                'Glucose screening test is typically this week',
                'Red, itchy palms',
                'Carpal tunnel symptoms',
                'Growing belly'
            ],
            tips: [
                'Glucose tolerance test',
                'Start thinking about baby essentials to purchase',
                'Begin interviewing pediatricians'
            ]
        },
        25: {
            development: [
                'Baby is growing more hair',
                'Skin is becoming less translucent',
                'Nostrils begin to open'
            ],
            symptoms: [
                'Trouble sleeping',
                'Restless leg syndrome',
                'Hemorrhoids',
                'Constipation'
            ],
            tips: [
                'Practice relaxation techniques',
                'Stay hydrated',
                'Consider prenatal yoga'
            ]
        },
        26: {
            development: [
                'Eyes are opening for the first time',
                'Brain wave activity for hearing and sight',
                'Lungs are developing'
            ],
            symptoms: [
                'Headaches',
                'Trouble sleeping',
                'Leg cramps',
                'Braxton Hicks contractions'
            ],
            tips: [
                'Start counting kicks',
                'Consider cord blood banking',
                'Begin creating baby registry'
            ]
        },
        27: {
            development: [
                'Baby is sleeping and waking at regular intervals',
                'Brain is very active',
                'Lungs continue to mature'
            ],
            symptoms: [
                'Third trimester begins',
                'Increased fatigue',
                'Restless sleep',
                'Frequent urination returns'
            ],
            tips: [
                'Welcome to the third trimester!',
                'Start stocking up on postpartum supplies',
                'Consider taking hospital tour'
            ]
        },
        28: {
            development: [
                'Baby can blink and has eyelashes',
                'Baby is developing more fat',
                'Brain is developing rapidly'
            ],
            symptoms: [
                'Shortness of breath',
                'Back pain',
                'Heartburn',
                'Trouble sleeping'
            ],
            tips: [
                'Rhogam shot if Rh negative',
                'Start prenatal appointments every 2 weeks',
                'Pack your hospital bag'
            ]
        },
        29: {
            development: [
                'Baby\'s bones are fully developed but still soft',
                'Baby is gaining weight rapidly',
                'Muscles and lungs are maturing'
            ],
            symptoms: [
                'Increased fetal movement',
                'Varicose veins',
                'Mood swings',
                'Difficulty getting comfortable'
            ],
            tips: [
                'Install car seat',
                'Finalize birth plan',
                'Prepare freezer meals'
            ]
        },
        30: {
            development: [
                'Baby weighs about 3 pounds',
                'Red blood cells are forming in bone marrow',
                'Brain is growing rapidly'
            ],
            symptoms: [
                'Mood swings',
                'Fatigue',
                'Swelling',
                'Trouble sleeping'
            ],
            tips: [
                'Take a childbirth class if you haven\'t',
                'Prepare siblings for new baby',
                'Consider newborn photography'
            ]
        },
        31: {
            development: [
                'Baby is going through major brain development',
                'All five senses are working',
                'Baby may be head-down by now'
            ],
            symptoms: [
                'Leaking colostrum',
                'Frequent urination',
                'Shortness of breath',
                'Braxton Hicks increasing'
            ],
            tips: [
                'Research breastfeeding if planning to nurse',
                'Set up nursery',
                'Prepare hospital bag if not done'
            ]
        },
        32: {
            development: [
                'Baby is practicing breathing',
                'Fingernails and toenails are fully formed',
                'Baby weighs about 3.5-4 pounds'
            ],
            symptoms: [
                'Stronger Braxton Hicks',
                'Leaky breasts',
                'Heartburn',
                'Difficulty sleeping'
            ],
            tips: [
                'Prenatal visits every 2 weeks',
                'Finalize baby name',
                'Prepare for maternity leave'
            ]
        },
        33: {
            development: [
                'Baby\'s bones are hardening (except skull)',
                'Baby is sleeping more',
                'Immune system is developing'
            ],
            symptoms: [
                'Hot flashes',
                'Increased thirst',
                'Pregnancy waddle',
                'Difficulty breathing'
            ],
            tips: [
                'Keep up with kick counts',
                'Rest when you can',
                'Stay hydrated'
            ]
        },
        34: {
            development: [
                'Lungs are well developed',
                'Fingernails have reached fingertips',
                'Baby weighs about 4.5-5 pounds'
            ],
            symptoms: [
                'Pelvic pressure',
                'Vision changes',
                'Fatigue',
                'Increased Braxton Hicks'
            ],
            tips: [
                'Preregister at hospital',
                'Review signs of labor',
                'Know when to call your provider'
            ]
        },
        35: {
            development: [
                'Baby is running out of room',
                'Most physical development is complete',
                'Baby is gaining about half a pound per week'
            ],
            symptoms: [
                'Frequent urination',
                'Pressure and discomfort',
                'Trouble sleeping',
                'Nesting instinct'
            ],
            tips: [
                'Group B strep test is usually this week',
                'Prepare postpartum support',
                'Review breastfeeding basics'
            ]
        },
        36: {
            development: [
                'Baby may drop into pelvis (lightening)',
                'Fat continues accumulating',
                'Baby weighs about 5.5-6 pounds'
            ],
            symptoms: [
                'Baby dropping (easier breathing, more pelvic pressure)',
                'Increased vaginal discharge',
                'Difficulty sleeping',
                'Nesting urges'
            ],
            tips: [
                'Weekly prenatal visits begin',
                'Cervical checks may begin',
                'Finalize all preparations'
            ]
        },
        37: {
            development: [
                'Baby is considered early term',
                'Baby is practicing breathing and sucking',
                'Fat continues to accumulate'
            ],
            symptoms: [
                'Increased pelvic pressure',
                'Trouble sleeping',
                'Swelling',
                'Anxiety about labor'
            ],
            tips: [
                'Baby is considered full term at 39 weeks',
                'Review labor signs',
                'Keep hospital bag ready'
            ]
        },
        38: {
            development: [
                'Baby\'s organs are ready for life outside',
                'Baby has a firm grasp',
                'Baby weighs about 6.5-7 pounds'
            ],
            symptoms: [
                'Nesting',
                'Cervical changes',
                'Irregular contractions',
                'Mucus plug may be released'
            ],
            tips: [
                'Rest as much as possible',
                'Stay close to home',
                'Know the signs of labor'
            ]
        },
        39: {
            development: [
                'Baby is full term',
                'Lungs are fully mature',
                'Baby is ready to be born'
            ],
            symptoms: [
                'Possible bloody show',
                'Water could break',
                'Strong Braxton Hicks',
                'Nesting'
            ],
            tips: [
                'Stay alert for labor signs',
                'Get plenty of rest',
                'Enjoy these last days of pregnancy'
            ]
        },
        40: {
            development: [
                'Baby is fully developed and ready',
                'Baby weighs about 7-8 pounds',
                'Baby is about 20 inches long'
            ],
            symptoms: [
                'Waiting for labor',
                'Possible membrane sweep',
                'Regular contractions may begin',
                'Nesting'
            ],
            tips: [
                'Your due date! Baby will come when ready',
                'Stay in contact with your provider',
                'Trust your body'
            ]
        }
    },

    // Prenatal visit schedule with questions and tasks
    prenatalVisits: [
        {
            week: 8,
            title: 'First Prenatal Visit',
            trimester: 1,
            questions: [
                'What prenatal vitamins should I be taking?',
                'What foods should I avoid during pregnancy?',
                'What medications are safe to take?',
                'What symptoms are normal vs concerning?',
                'How much weight should I expect to gain?',
                'What exercise is safe for me?',
                'When will I hear the heartbeat?',
                'What genetic testing options are available?',
                'How do I reach you in an emergency?'
            ],
            tasks: [
                'Sign up for health insurance maternity coverage review',
                'Start prenatal vitamins daily',
                'Schedule first trimester screening tests',
                'Begin researching pediatricians',
                'Look into childbirth class options',
                'Consider maternity/paternity leave options at work',
                'Start a pregnancy journal or photo series'
            ],
            notes: ''
        },
        {
            week: 12,
            title: '12 Week Visit (NT Scan)',
            trimester: 1,
            questions: [
                'What do the NT scan results mean?',
                'Should I get NIPT testing?',
                'When will morning sickness improve?',
                'Is it safe to announce the pregnancy now?',
                'What genetic counseling options are available?',
                'When is the anatomy scan scheduled?'
            ],
            tasks: [
                'Complete first trimester screening',
                'Decide about genetic testing',
                'Plan pregnancy announcement if desired',
                'Research daycare options and waitlists',
                'Schedule 16-week appointment',
                'Review and update emergency contacts'
            ],
            notes: ''
        },
        {
            week: 16,
            title: '16 Week Visit',
            trimester: 2,
            questions: [
                'When can we find out the baby\'s sex?',
                'Should I be feeling movement by now?',
                'Is round ligament pain normal?',
                'What should I know about the anatomy scan?',
                'When should I start childbirth classes?',
                'Are there any concerns based on my recent tests?'
            ],
            tasks: [
                'Sign up for daycare waitlist (long waitlists!)',
                'Begin researching childbirth classes',
                'Schedule anatomy scan (18-22 weeks)',
                'Start planning nursery',
                'Update workplace about pregnancy if needed',
                'Begin building baby registry'
            ],
            notes: ''
        },
        {
            week: 20,
            title: '20 Week Visit (Anatomy Scan)',
            trimester: 2,
            questions: [
                'Is everything developing normally?',
                'Where is my placenta located?',
                'Is there anything concerning on the ultrasound?',
                'Can you confirm the due date?',
                'Should I be concerned about any measurements?',
                'When should I start kick counts?'
            ],
            tasks: [
                'Complete anatomy scan',
                'Decide whether to learn baby\'s sex',
                'Finalize baby registry',
                'Register for childbirth classes',
                'Start shopping for nursery essentials',
                'Consider cord blood banking',
                'Look into pediatrician options'
            ],
            notes: ''
        },
        {
            week: 24,
            title: '24 Week Visit (Glucose Test)',
            trimester: 2,
            questions: [
                'What do I need to know about the glucose test?',
                'How are baby\'s movements looking?',
                'What symptoms should concern me at this stage?',
                'When do I need Rhogam if I\'m Rh negative?',
                'Should I be concerned about preterm labor signs?',
                'How should I manage swelling?'
            ],
            tasks: [
                'Complete glucose tolerance test',
                'Get Rhogam shot if Rh negative',
                'Tour hospital or birthing center',
                'Finalize childcare arrangements',
                'Start preparing freezer meals',
                'Begin thinking about birth plan',
                'Interview and select pediatrician'
            ],
            notes: ''
        },
        {
            week: 28,
            title: '28 Week Visit (Third Trimester Begins)',
            trimester: 3,
            questions: [
                'How do I do kick counts properly?',
                'What are signs of preterm labor?',
                'What is my baby\'s position?',
                'Are there any concerns about my blood pressure?',
                'What should I include in my birth plan?',
                'When should I pack my hospital bag?'
            ],
            tasks: [
                'Start doing daily kick counts',
                'Begin prenatal visits every 2 weeks',
                'Pack hospital bag',
                'Install car seat (have it checked)',
                'Finalize birth plan',
                'Prepare for maternity leave at work',
                'Set up nursery',
                'Take hospital tour if not done'
            ],
            notes: ''
        },
        {
            week: 32,
            title: '32 Week Visit',
            trimester: 3,
            questions: [
                'Is baby head-down?',
                'How can I help baby turn if breech?',
                'What are signs of preeclampsia?',
                'How are my iron levels?',
                'What happens if I go past my due date?',
                'When should I go to the hospital?'
            ],
            tasks: [
                'Preregister at hospital',
                'Finalize baby name decision',
                'Complete nursery setup',
                'Arrange postpartum help/meal train',
                'Take breastfeeding class if planning to nurse',
                'Wash baby clothes and bedding',
                'Review cord blood banking decision'
            ],
            notes: ''
        },
        {
            week: 36,
            title: '36 Week Visit (Weekly Visits Begin)',
            trimester: 3,
            questions: [
                'What is my Group B strep status?',
                'Is baby in position for delivery?',
                'What does my cervical exam show?',
                'What are my options if baby is breech?',
                'What are the signs that labor is starting?',
                'When should I call or come in?'
            ],
            tasks: [
                'Get Group B strep test (35-37 weeks)',
                'Begin weekly prenatal visits',
                'Double-check hospital bag',
                'Confirm pediatrician for hospital',
                'Finish birth announcements/thank you cards',
                'Prepare siblings for baby arrival',
                'Review newborn care basics'
            ],
            notes: ''
        },
        {
            week: 37,
            title: '37 Week Visit',
            trimester: 3,
            questions: [
                'Has my cervix started to change?',
                'Is baby still in good position?',
                'What are Group B strep results?',
                'What happens during labor and delivery?',
                'What pain relief options are available?',
                'What if I need a C-section?'
            ],
            tasks: [
                'Review Group B strep results',
                'Confirm all hospital paperwork is done',
                'Verify insurance coverage for delivery',
                'Finalize postpartum support plans',
                'Rest and prepare mentally',
                'Enjoy date nights while you can!'
            ],
            notes: ''
        },
        {
            week: 38,
            title: '38 Week Visit',
            trimester: 3,
            questions: [
                'Any changes to my cervix?',
                'Should we discuss induction?',
                'What if my water breaks?',
                'What is the mucus plug and bloody show?',
                'How long can I safely go past due date?',
                'What should I expect during delivery?'
            ],
            tasks: [
                'Keep phone charged and with you',
                'Finalize birth partner roles',
                'Stock up on postpartum supplies',
                'Prepare pets for baby arrival',
                'Set up support for other children',
                'Rest and stay close to home'
            ],
            notes: ''
        },
        {
            week: 39,
            title: '39 Week Visit',
            trimester: 3,
            questions: [
                'How is baby doing?',
                'Any cervical progress?',
                'Should we schedule an induction date?',
                'What natural methods might help start labor?',
                'What do contractions feel like?',
                'When is it "go time"?'
            ],
            tasks: [
                'Stay alert for labor signs',
                'Keep activity light',
                'Get plenty of rest',
                'Enjoy final preparations',
                'Stay hydrated and well-nourished'
            ],
            notes: ''
        },
        {
            week: 40,
            title: '40 Week Visit (Due Date)',
            trimester: 3,
            questions: [
                'Should we induce or wait?',
                'How often should I be monitored now?',
                'What are the risks of going past due date?',
                'What induction methods do you use?',
                'What is my Bishop score?',
                'When would you recommend a C-section?'
            ],
            tasks: [
                'Continue daily kick counts',
                'Stay in close contact with provider',
                'Consider membrane sweep if offered',
                'Rest and stay patient',
                'Trust your body and baby'
            ],
            notes: ''
        }
    ],

    // Pediatric visit schedule (0-6 months)
    pediatricVisits: [
        {
            age: '3-5 days',
            title: 'First Newborn Visit',
            questions: [
                'Is baby gaining weight appropriately?',
                'How do I know if baby is getting enough milk?',
                'Is the jaundice level normal?',
                'How often should baby be eating?',
                'What is the umbilical cord care routine?',
                'When will baby\'s belly button heal?',
                'How do I care for the circumcision (if applicable)?',
                'What are signs of newborn illness to watch for?',
                'When should I call the office vs go to ER?'
            ],
            tasks: [
                'Schedule baby\'s first appointment before discharge',
                'Get birth certificate paperwork started',
                'Add baby to health insurance (usually 30 days)',
                'Set up safe sleep environment',
                'Learn infant CPR basics',
                'Start tracking feeds and diapers',
                'Request medical records if needed'
            ],
            notes: '',
            vaccinations: ['Hepatitis B (if not given at birth)']
        },
        {
            age: '2 weeks',
            title: '2 Week Visit',
            questions: [
                'Is baby back to birth weight?',
                'Are feeding patterns normal?',
                'How do I help with gas/colic?',
                'Is this rash normal?',
                'When can we go out in public?',
                'How do I know if baby is sleeping enough?',
                'Is spitting up normal vs reflux?',
                'When will baby smile?'
            ],
            tasks: [
                'Continue weight monitoring',
                'File for birth certificate',
                'Get Social Security card application started',
                'Set up postpartum visit for mom',
                'Consider newborn photos',
                'Join a new parent support group'
            ],
            notes: '',
            vaccinations: []
        },
        {
            age: '1 month',
            title: '1 Month Visit',
            questions: [
                'Is baby\'s growth on track?',
                'Should I be concerned about baby\'s sleeping patterns?',
                'How do I establish good sleep habits?',
                'When should we introduce tummy time?',
                'Is baby seeing and hearing well?',
                'How do I know if baby has reflux vs normal spitting up?',
                'What developmental milestones should I watch for?'
            ],
            tasks: [
                'Start regular tummy time',
                'Confirm baby is on health insurance',
                'Schedule next pediatric visit',
                'Consider life insurance/will updates',
                'Prepare to return to work if applicable',
                'Research childcare options if needed'
            ],
            notes: '',
            vaccinations: ['Hepatitis B (2nd dose if not given earlier)']
        },
        {
            age: '2 months',
            title: '2 Month Visit',
            questions: [
                'What vaccines will baby receive today?',
                'How can I comfort baby after shots?',
                'Is baby\'s development on track?',
                'What sleep schedule should we aim for?',
                'When can baby sleep through the night?',
                'How much should baby be eating now?',
                'When can we introduce a bottle to a breastfed baby?'
            ],
            tasks: [
                'First major round of vaccinations',
                'Have infant Tylenol on hand (ask about dosing)',
                'Continue tummy time daily',
                'Baby-proof obvious hazards',
                'Start establishing bedtime routine',
                'Schedule next appointment'
            ],
            notes: '',
            vaccinations: ['DTaP', 'Hib', 'Polio (IPV)', 'Pneumococcal (PCV13)', 'Rotavirus']
        },
        {
            age: '4 months',
            title: '4 Month Visit',
            questions: [
                'Is baby\'s growth and development normal?',
                'When can we start solid foods?',
                'Is baby ready for sleep training?',
                'What are the 4-month sleep regression signs?',
                'How much should baby be eating now?',
                'Should baby be rolling over by now?',
                'Is this level of drooling normal?'
            ],
            tasks: [
                'Second round of vaccinations',
                'Research starting solid foods',
                'Consider sleep training options',
                'Increase tummy time',
                'Baby-proof as baby becomes more mobile',
                'Start looking at high chairs',
                'Confirm childcare arrangements'
            ],
            notes: '',
            vaccinations: ['DTaP (2nd)', 'Hib (2nd)', 'Polio (2nd)', 'Pneumococcal (2nd)', 'Rotavirus (2nd)']
        },
        {
            age: '6 months',
            title: '6 Month Visit',
            questions: [
                'Is it time to start solid foods?',
                'What foods should we start with?',
                'What foods should we avoid?',
                'How do we prevent and handle allergies?',
                'Is baby sitting up well?',
                'What about teething?',
                'When should we start dental care?',
                'Is baby sleeping through the night?'
            ],
            tasks: [
                'Third round of vaccinations',
                'Start introducing solid foods',
                'Get a high chair if not done',
                'Baby-proof more thoroughly',
                'Anchor furniture to walls',
                'Cover outlets, secure cabinets',
                'Consider a walker or activity center',
                'Schedule first dental visit for around 1 year'
            ],
            notes: '',
            vaccinations: ['DTaP (3rd)', 'Hib (3rd)', 'Pneumococcal (3rd)', 'Rotavirus (3rd)', 'Hepatitis B (3rd)', 'Flu (seasonal)']
        }
    ],

    // Baby developmental milestones (0-6 months)
    milestones: {
        '0-1 month': [
            { id: 'lift_head_briefly', text: 'Lifts head briefly during tummy time', category: 'Physical' },
            { id: 'follows_face', text: 'Follows faces with eyes', category: 'Cognitive' },
            { id: 'startles_sounds', text: 'Startles at loud sounds', category: 'Sensory' },
            { id: 'recognizes_voice', text: 'Recognizes parent\'s voice', category: 'Social' },
            { id: 'cries_needs', text: 'Cries to communicate needs', category: 'Communication' },
            { id: 'grasp_reflex', text: 'Has strong grasp reflex', category: 'Physical' }
        ],
        '1-2 months': [
            { id: 'holds_head_45', text: 'Holds head at 45-degree angle', category: 'Physical' },
            { id: 'tracks_objects', text: 'Tracks moving objects', category: 'Cognitive' },
            { id: 'social_smile', text: 'First social smile', category: 'Social' },
            { id: 'coos', text: 'Makes cooing sounds', category: 'Communication' },
            { id: 'calms_voice', text: 'Calms when hearing familiar voice', category: 'Social' },
            { id: 'smooth_movements', text: 'Movements becoming smoother', category: 'Physical' }
        ],
        '2-3 months': [
            { id: 'holds_head_90', text: 'Holds head up at 90-degree angle', category: 'Physical' },
            { id: 'push_up_arms', text: 'Pushes up on arms during tummy time', category: 'Physical' },
            { id: 'follows_180', text: 'Follows objects 180 degrees', category: 'Cognitive' },
            { id: 'reaches_toys', text: 'Reaches for dangling toys', category: 'Physical' },
            { id: 'laughs', text: 'Laughs out loud', category: 'Social' },
            { id: 'varied_cries', text: 'Has different cries for different needs', category: 'Communication' }
        ],
        '3-4 months': [
            { id: 'rolls_tummy_back', text: 'Rolls from tummy to back', category: 'Physical' },
            { id: 'bears_weight_legs', text: 'Bears weight on legs when held', category: 'Physical' },
            { id: 'grabs_objects', text: 'Grabs objects voluntarily', category: 'Physical' },
            { id: 'brings_hands_mouth', text: 'Brings hands to mouth', category: 'Physical' },
            { id: 'babbles', text: 'Babbles and makes consonant sounds', category: 'Communication' },
            { id: 'responds_name', text: 'Starts responding to name', category: 'Cognitive' }
        ],
        '4-5 months': [
            { id: 'rolls_both_ways', text: 'Rolls both ways', category: 'Physical' },
            { id: 'sits_support', text: 'Sits with support', category: 'Physical' },
            { id: 'reaches_one_hand', text: 'Reaches with one hand', category: 'Physical' },
            { id: 'transfers_objects', text: 'Transfers objects between hands', category: 'Physical' },
            { id: 'raspberry', text: 'Makes raspberry/blowing sounds', category: 'Communication' },
            { id: 'recognizes_stranger', text: 'Shows awareness of strangers', category: 'Social' }
        ],
        '5-6 months': [
            { id: 'sits_briefly', text: 'Sits without support briefly', category: 'Physical' },
            { id: 'bounces_stand', text: 'Bounces when held in standing position', category: 'Physical' },
            { id: 'passes_hands', text: 'Passes objects from hand to hand', category: 'Physical' },
            { id: 'looks_dropped', text: 'Looks for dropped objects', category: 'Cognitive' },
            { id: 'responds_emotions', text: 'Responds to others\' emotions', category: 'Social' },
            { id: 'strings_vowels', text: 'Strings vowels together when babbling', category: 'Communication' }
        ]
    },

    // Default feeding types
    feedingTypes: [
        { id: 'breast_left', label: 'Breast (Left)', icon: '🤱' },
        { id: 'breast_right', label: 'Breast (Right)', icon: '🤱' },
        { id: 'breast_both', label: 'Breast (Both)', icon: '🤱' },
        { id: 'bottle_breast', label: 'Bottle (Breast Milk)', icon: '🍼' },
        { id: 'bottle_formula', label: 'Bottle (Formula)', icon: '🍼' },
        { id: 'solid', label: 'Solid Food', icon: '🥣' }
    ],

    // Default diaper types
    diaperTypes: [
        { id: 'wet', label: 'Wet', icon: '💧' },
        { id: 'dirty', label: 'Dirty', icon: '💩' },
        { id: 'both', label: 'Both', icon: '💧💩' },
        { id: 'dry', label: 'Dry', icon: '✨' }
    ]
};

// Make it available globally
if (typeof window !== 'undefined') {
    window.AppData = AppData;
}
