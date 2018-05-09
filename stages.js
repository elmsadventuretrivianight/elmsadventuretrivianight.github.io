var Begstage = new Displaystage("Hey there! Welcome to the Elms College Adventure Trivia Night!");
Begstage = new Displaystage("Throughout this challenge, you will be answering trivia questions and helping Bolt with a trivia quiz.");
Begstage = new Displaystage("Feel free to have one or more people on your team, but no cheating! For each team only one phone should be used.");
Begstage = new Displaystage("You can win prizes by completing Blazer Riddle first, completing the challenge the fastest, or having the most points!");
Begstage = new Displaystage("You earn points by answering trivia questions correctly, but you don't lose any for being wrong.");
Begstage = new Displaystage("Short-answer questions give you two points!");
Begstage = new Displaystage("You can also earn points and get hints for the Blazer Riddle at the places Bolt tells you to go. So don't ignore him!");
Begstage = new Displaystage("To make sure we're giving the right prizes to the right people, We're going to have to ask you a few questions first.");
Begstage = new Displaystage("Just so you know, we'll collect some anonymized data (besides name) to make future events bigger and better.");
Begstage = new Displaystage("Don't worry about other people that might be on your team helping you. We only need the phone-holder's info!");
Begstage = new Infostage();
Begstage = new Displaystage("Great! This information will be used to make future SAB events better!");
Begstage = new Displaystage("This includes stuff like how long it took you to complete the game.");
Begstage = new Displaystage("Oh look, there's Bolt!");
Begstage = new Boltstage("Yo! Bolt here.");
Begstage = new Boltstage("I have to take a quiz on trivia and riddles; could you help me?");
Begstage = new Boltstage("Cool. Just to let you know, I like to study across campus. It helps me think.");
Begstage = new Boltstage("I hope you can keep up with me!");
Begstage = new Startstage("Lets begin!");

var questionArraysList = 
[
    //Quad Questions    
    [
        
        {  
            qID: 0,
            question: "When is Earth Day?",
            choices: [ "June 18th", "April 22nd", "February 33rd", "January 23rd"],
            correct: "April 22nd" 
        },

        {  
            qID: 1,
            question: "What is the only mammal that can fly?",
            choices: [ "Owl", "Sugar Glider", "Flying Squirrel", "Bat"],
            correct: "Bat" 
        }, 

        {  
            qID: 2,
            question: "What is a young goat called?",
            choices: [ "Goat", "Kid", "Marsupial", "Calf"],
            correct: "Kid" 
        },

        {  
            qID: 3,
            question: "Beta, Breen, Cobia, and Oscars are all types of what animal?",
            choices: [ "Fish", "Pokemon", "Lizards", "Birds"],
            correct: "Fish" 
        },

        {  
            qID: 4,
            question: "What type of animal is a Mandrill?",
            choices: ["Dinosaur", "Feline", "Amphibian", "Primate"],
            correct: "Primate" 
        },
        
        {  
            boltText: "Let's try some nature trivia, yeah?", 
        },
        
        {  
            boltText: "I like to study nature out here.", 
        },
        
        {  
            boltText: "Alright, let's go to the Quad.", 
        },
    ],
    //Gym Questions
    [
        
        {  
            qID: 10,
            question: "Who won the World Series in 2013?",
            choices: [ "Miami Dolphins", "New York Mets", "Boston Red Sox", "Houston Astros" ],
            correct: "Boston Red Sox" 
        },

        {  
            qID: 11,
            question: "Who won the 1950 Super Bowl?",
            choices: [ "Carolina Panthers", "Cleveland Browns", "Boston Celtics", "Atlanta Falcons"],
            correct: "Cleveland Browns" 
        },

        {  
            qID: 12,
            question: "Where was the location of the 1958 FIFA World Cup?",
            choices: [ "Switzerland", "Antartica", "Norway", "Sweden"],
            correct: "Sweden" 
        },

        {  
            qID: 13,
            question: "How many holes are there in a typical game of golf?",
            choices: [ "27", "18", "16", "13"],
            correct: "18" 
        },

        {  
            qID: 14,
            question: "What year did both the UCONN Men and Women win the national championship for Basketball?",
            choices: [ "2014", "1774", "1997", "2020"],
            correct: "2014" 
        },
        
        {  
            boltText: "I think it's time for some sports trivia questions.", 
        },
        
        {  
            boltText: "With the combination of the fitness center, these trivia questions and all the sports oppurtunities,", 
        },
        
        {  
            boltText: "Let's head to the McGuire Center. It's always best to think after a workout.", 
        },
    ],
    //Admissions Questions
    [
        
        {  
            qID: 20,
            question: "During which year did Christopher Columbus first arrive in the Americas?",
            choices: [ "1872", "1592", "102", "1492"],
            correct: "1492" 
        },

        {  
            qID: 21,
            question: "Who is the only person to have served as both US Vice President and President without being elected into either office?",
            choices: [ "Abraham Lincoln", "Gerald Ford", "Jimmy Carter", "Richard Nixon"],
            correct: "Gerald Ford" 
        },

        {  
            qID: 22,
            question: "The Great War began in which year?",
            choices: [ "1914", "1819", "1939", "1942"],
            correct: "1914" 
        },

        {  
            qID: 23,
            question: "Adolf Hitler was born in which country?",
            choices: [ "United States of America", "Germany", "Austria", "Cyprus"],
            correct: "Austria" 
        },

        {  
            qID: 24,
            question: "The first successful modern printing press was developed by which inventor?",
            choices: [ "Peter Parker", "Benjamin Franklin", "Leonardo Di Vinci", "Johannes Gutenburg"],
            correct: "Johannes Gutenburg" 
        },
        
        {  
            boltText: "Theres so much history in this place! Time for some history questions.", 
        },
        
        {  
            boltText: "Here is where all the different generations of Elms students once stood.", 
        },
        
        {  
            boltText: "Alright, let's go to Admissions.", 
        },
    ],
    //CNHS Questions
     [
         
        {  
            qID: 30,
            question: "When is Pi day?",
            choices: [ "May 4th", "October 31st", "March 14th", "April 15th"],
            correct: "March 14th" 
        },

        {  
            qID: 31,
            question: "What can you add to 7.44 to make exactly 8?",
            choices: [ "1", ".66", ".36", ".56"],
            correct: ".56" 
        },

        {  
            qID: 32,
            question: "There are 3 green rocks, 4 brown rocks, 3 white rocks, and 2 blue rocks; what is the ratio of green rocks to all the rocks?",
            choices: [ "3:12", "9:12", "12:12", "6:12"],
            correct: "3:12" 
        },

        {  
            qID: 33,
            question: "How many ounces are in a pound?",
            choices: [ "4", "8", "16", "18"],
            correct: "16" 
        },

        {  
            qID: 34,
            question: "How many sides does a Heptagon have?",
            choices: [ "Twelve", "Six", "Nine", "Seven"],
            correct: "Seven" 
        },
        
        {  
            boltText: "Because of that all the questions here are based on the math!", 
        },
         
        {  
            boltText: "This building is one of the newest buildings on campus, and it focuses on the sciences.", 
        },
         
        {  
            boltText: "Now onto the Lyons Center for Natural Health and Sciences... what a mouthful!", 
        },
        
    ],
    //Cafe Questions 
    [
        
        {  
            qID: 40,
            question: "The state of Georgia is famous for what fruit?",
            choices: [ "Plums", "Clementines", "Peaches", "Cantalope"],
            correct: "Peaches"
        },

        {  
            qID: 41,
            question: "What are black-eyed peas?",
            choices: [ "Beans", "A British Band", "Seeds", "Peas"],
            correct: "Beans" 
        },

        {  
            qID: 42,
            question: "What food is the leading source of salmonella poisoning?",
            choices: [ "Beef", "Chicken", "Steak", "Fish"],
            correct: "Chicken" 
        },

        {  
            qID: 43,
            question: "What is the third character on the cereal brand Rice Krispies? Snap, ___, and Pop",
            choices: [ "Slop", "Clap", "Crackle", "Crinkle"],
            correct: "Crackle" 
        },

        {  
            qID: 44,
            question: "What animals milk is used to make authentic Italian mozzarella cheese?",
            choices: [ "Cow", "Sheep", "Chicken", "Water Buffalo"],
            correct: "Water Buffalo" 
        },
        
        {  
            boltText: "This is the perfect time to ask you the food questions on my quiz.", 
        },
        
        {  
            boltText: "Maybe we should go stop by the cafe for a bite to eat.", 
        },
        
        {  
            boltText: "Man! I'm getting hungry! ", 
        },
        
    ],
    //Library RIDDLES
    //SHORT ANSWER QUESTIONS
    [
        
        {  
            qID: 50,
            question: "What starts with 'e', ends with 'e', and contains one letter?",
            correct: "envelope" 
        },

        {  
            qID: 51,
            question: "What has one eye but cannot see?",
            correct: "needle"
        },

        {  
            qID: 52,
            question: "What kind of coat is always wet when you put it on?",
            correct: "paint"
        },

        {  
            qID: 53,
            question: "What do you break before you use it?",
            correct: "egg" 
        },

        {  
            qID: 54,
            question: "What is the most curious letter in the alphabet?",
            correct: "y" 
        },
        
        {  
            boltText: "They all have one word answers.", 
        },
        
        {  
            boltText: "I think we should try some other questions, how about some riddles!", 
        },
        
        {  
            boltText: "Alright! Time to get back to studying! The best place to do that is the library.", 
        },
        
    ],
    //Public Safety Questions
    [
        
        {  
            qID: 60,
            question: "Who lives in a pineapple under the sea?",
            choices: [ "Patrick Star", "SpongeBob SquarePants", "Squidward Tentacles", "SquareBob SpongePants"],
            correct: "SpongeBob SquarePants" 
        },    

        {  
            qID: 61,
            question: "What two colors make green?",
            choices: [ "Blue and Yellow", "Yellow and Red", "Purple and Orange", "Blue and Red"],
            correct: "Blue and Yellow"
        },

        {  
            qID: 62,
            question: "What Disney movie featured the song 'We're All In This Together'?",
            choices: [ "High School Musical 3", "The Cheetah Girls 2", "High School Musical", "Camp Rock"],
            correct: "High School Musical"
        },

        {
            qID: 63,
            question: "Where is Disneyland located?",
            choices: [ "Tokyo", "Florida", "California", "Australia"],
            correct: "California"
        },

        {  
            qID: 64,
            question: "Which state is considered the Sunshine State?",
            choices: [ "California", "Hawaii", "Nevada", "Florida"],
            correct: "Florida" 
        },
        
        {  
            boltText: "While we're waiting; lets answer some random trivia questions.", 
        },
        
        {  
            boltText: "I guess we have to go to Public Safety, bummer.", 
        },
        
        {  
            boltText: "Oh man! We're locked out of the Res Halls!", 
        },
        
    ],
    //Berchmans Hall Questions
    [
        
        {  
            qID: 70,
            question: "What year did Elms College become co-ed?",
            choices: [ "1998", "1928", "1962", "2005"],
            correct: "1998" 
        },

        {  
            qID: 71,
            question: "Who was the college president when the school turned co-ed?",
            choices: [ "Dr. Harry Dumay", "Sr. Kathleen Keating", "Sr. Mary Reap", "William Dziura"],
            correct: "Sr. Kathleen Keating"
        },

        {  
            qID: 72,
            question: "How many states do Elms College alumni reside in?",
            choices: [ "35", "81", "17", "49"],
            correct: "49" 
        },

        {  
            qID: 73,
            question: "How many countries do Elms College alumni reside in?",
            choices: [ "25", "195", "2", "76"],
            correct: "25" 
        },

        {  
            qID: 74,
            question: "How old is the oldest living Elms College alumni?",
            choices: [ "21", "87", "105", "117"],
            correct: "105" 
        },
        
        {  
            boltText: "Here are some trivia questions about the history of Our Lady of the Elms College.", 
        },
       
        {  
            boltText: "The chapel... oh right! That's not there anymore. Well then Berchman's Hall it is! ", 
        },
       
        {  
            boltText: "Let's take a trip to the oldest building on campus!", 
        },
          
    ],
    //Final Question
    [
        
        {  
            boltText: "Alright, that's enough studying. It's time for the final question!", 
        },
        
        {  
            boltText: "Thank you for all your help, and good luck!", 
        },
        
        {
            qID: 80,
            question: "This thing all things devours, birds, beasts, trees, and flowers. Gnaws iron, bites steel, Grinds hard stones to meal, Slays king, ruins town, And beats high mountain down. What am I?",
            correct: "time"
        },
        
        {
            endText: "Congratulations! You've finished the Trivia Adventure! Here's some stats!"
        },
        
        
    ]
]
