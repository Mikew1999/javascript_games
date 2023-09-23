import random

# possible options in a list
options = ["rock","paper","scissors"]

# loop indefinitely
while True:
    # computer makes choice from above options
    computer_choice = random.choice(options)

    # ask for users choice
    user_choice = str(input("Select 'rock', 'paper' or 'scissors' ")).strip().lower()
    print(f"your choice: {user_choice}")
    print(f"computer choice: {computer_choice}")

    # if user and computer pick same option, draw
    if computer_choice == user_choice:
        print("draw")
        continue

    # match the user choice to the possible options
    match user_choice:
        # if 
        case 'rock':
            if computer_choice == "paper":
                print("Computer wins!")
            else:
                print("you win!")
            continue
        case 'paper':
            if computer_choice == "rock":
                print("you win!")
            else:
                print("computer wins")
            continue
        case 'scissors':
            if computer_choice == "paper":
                print("you win!")
            else:
                print("computer wins")
            continue
        case _:
            print("invalid input")
            continue
