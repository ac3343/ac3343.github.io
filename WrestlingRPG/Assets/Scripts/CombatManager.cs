using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CombatManager : MonoBehaviour
{
    enum CombatStates
    {
        PlayerTurn,
        EnemyTurn,
        DamageDealt,
        End
    }

    //Fields
    CombatStates currentState;
    
    //Wrestlers
    public GameObject playerPrefab;
    public GameObject enemyPrefab;
    Wrestler player;
    Wrestler enemy;

    //Turn data
    Wrestler winner;
    string actionMessage;

    //Primary menu and options
    List<string> menu;
    string attackOption = "Attack";
    string restOption = "Rest";
    string tauntOption = "Taunt";

    //Attack menu and option'
    List<string> attackMenu;
    string strikeOption = "Strike";
    string grappleOption = "Grapple";
    string setUpOption = "Set Up";
    string backOption = "Back";

    //Player strike, grapple, and taunt menu
    List<string> strikeMenu, grappleMenu, tauntMenu;

    //Selected menu fields
    int selectedOption;
    List<string> currentMenu;
    List<string> displayedMenu;
    List<string> commandMenu;
    string endTurnOption = "End Turn";
   
    // Start is called before the first frame update
    void Start()
    {
        //Begins combat on the player's turn
        currentState = CombatStates.PlayerTurn;

        //Creates the player and enemy wrestlers
        player = Instantiate(playerPrefab).GetComponent<Wrestler>();
        enemy = Instantiate(enemyPrefab).GetComponent<Wrestler>();

        //Teaches punch to the player and the enemy
        player.LearnAttack(AttackList.Punch);
        enemy.LearnAttack(AttackList.Punch);

        //Teaches player and enemy taunt
        player.LearnTaunt(TauntList.Roar);
        enemy.LearnTaunt(TauntList.Roar);

        //Creates menu
        menu = new List<string>();

        //Adds menu options
        menu.Add(attackOption);
        menu.Add(restOption);
        menu.Add(tauntOption);

        //First selected option is attack
        selectedOption = 0;

        //Creates attack menu
        attackMenu = new List<string>();

        //Adds attack menu options
        attackMenu.Add(strikeOption);
        attackMenu.Add(grappleOption);
        attackMenu.Add(setUpOption);
        attackMenu.Add(backOption);

        //Creates strike, grapple, and taunt menu
        strikeMenu = new List<string>();
        grappleMenu = new List<string>();
        tauntMenu = new List<string>();

        //Loops through player's list of attacks
        foreach(Attack a in player.learnedAttacks)
        {
            if(a.Type == "Strike")
            {
                strikeMenu.Add(a.Name);
            }
            else if(a.Type == "Grapple")
            {
                grappleMenu.Add(a.Name);
            }
        }
        
        //Adds all taunts to list of taunts
        foreach(Taunt t in player.learnedTaunts)
        {
            tauntMenu.Add(t.Name);
        }


        //Adds back option to strike grapple, and taunt menus
        strikeMenu.Add(backOption);
        grappleMenu.Add(backOption);
        tauntMenu.Add(backOption);

        //Sets currentMenu to the primary menu
        currentMenu = menu;

        //Creates comand menu
        commandMenu = new List<string>();

        //Adds end turn option to comand menu
        commandMenu.Add(endTurnOption);

        //Sets displayed menu equal to current menu
        displayedMenu = currentMenu;
    }

    // Update is called once per frame
    void Update()
    {
        switch (currentState)
        {
            case CombatStates.PlayerTurn:
                //Checks to see if the space bar is pressed
                if (Input.GetKeyDown(KeyCode.Space))
                {
                    //Resets action message
                    actionMessage = "";

                    //Goes to attack menu if the Attack option is selected
                    if(currentMenu == menu && selectedOption == 0)
                    {
                        currentMenu = attackMenu;
                    }
                    else if(currentMenu == menu && selectedOption == 2)
                    {
                        currentMenu = tauntMenu;
                    }
                    else if((currentMenu == attackMenu || currentMenu == tauntMenu) && selectedOption == currentMenu.Count - 1)
                    {
                        //Goes back to previous menu
                        currentMenu = menu;
                    }
                    else if(currentMenu == attackMenu && selectedOption == 0)
                    {
                        //Goes to strike menu
                        currentMenu = strikeMenu;
                    }
                    else if (currentMenu == attackMenu && selectedOption == 1)
                    {
                        //Goes to grapple menu
                        currentMenu = grappleMenu;
                    }
                    else if((currentMenu == strikeMenu || currentMenu == grappleMenu) && selectedOption == currentMenu.Count - 1)
                    {
                        //Goes to attack menu
                        currentMenu = attackMenu;
                    }
                    else if(currentMenu != commandMenu)
                    {
                        //If the selection is already in the field
                        if (!player.CommandChain.Contains(currentMenu[selectedOption]) || currentMenu == strikeMenu || currentMenu == grappleMenu)
                        {
                            //Adds selection to commandmenu
                            AddSelectionToCommandList();
                        }
                        else
                        {
                            //Removes selection from list
                            RemoveSelectionFromCommandList();
                        }
                        
                    }
                    else if(currentMenu == commandMenu)
                    {
                        //Removes selection from list
                        RemoveSelectionFromCommandList();
                        currentMenu = displayedMenu;
                    }
                    displayedMenu = currentMenu;
                    selectedOption = 0;
                }
                else if (Input.GetKeyDown(KeyCode.DownArrow))
                {
                    //Selects next menu option
                    selectedOption++;
                    if(selectedOption >= currentMenu.Count)
                    {
                        selectedOption = 0;
                    }
                }
                else if (Input.GetKeyDown(KeyCode.UpArrow))
                {
                    //Selects previous menu option
                    selectedOption--;
                    if (selectedOption < 0)
                    {
                        selectedOption = currentMenu.Count - 1;
                    }
                }
                else if (Input.GetKeyDown(KeyCode.RightArrow))
                {
                    //Sets current menu to the command menu
                    currentMenu = commandMenu;

                    //Resets selected option
                    selectedOption = 0;
                }
                else if (Input.GetKeyDown(KeyCode.LeftArrow))
                {
                    //Sets current menu to the command menu
                    currentMenu = displayedMenu;

                    //Resets selected option
                    selectedOption = 0;
                }
                break;
            case CombatStates.EnemyTurn:
                if (Input.GetKeyDown(KeyCode.Space))
                {
                    //Randomizes commands
                    enemy.RandomizeCommandChain();

                    //Undergoes the wrestler turn
                    EndTurn(enemy, player, CombatStates.PlayerTurn);

                    //Resets menu data
                    ResetMenuData();
                }
                break;
            case CombatStates.DamageDealt:
                break;
            case CombatStates.End:
                break;
        }
    }

    private void OnGUI()
    {
        switch (currentState)
        {
            case CombatStates.PlayerTurn:
                //Menu
                for(int i = 0; i < displayedMenu.Count; i++)
                {
                    //If the displayed menu is selected, selected option is highlighted
                    GUI.color = i == selectedOption && currentMenu == displayedMenu ? Color.yellow : Color.white;

                    //Prints menu options out to screen
                    GUI.Label(new Rect(100, 35 + i*20, 200, 50), displayedMenu[i]);
                }

                //Taunt Descriptions
                if (currentMenu == tauntMenu && selectedOption != currentMenu.Count - 1)
                {
                    GUI.color = Color.white;

                    //Gets selected taunt
                    Taunt currentTaunt = player.knownTaunts[currentMenu[selectedOption]];

                    //Prints taunt's descritption out to screen
                    GUI.Label(new Rect(200, 35, 200, 50), currentTaunt.Description);
                }

                //Draws command menu
                for(int i = 0; i < commandMenu.Count; i++)
                {
                    //If the command menu is selected, selected option is highlighted
                    GUI.color = i == selectedOption && currentMenu == commandMenu ? Color.yellow : Color.white;

                    //Prints menu options out to screen
                    GUI.Label(new Rect(250 , 250 + 25 * i, 200, 50), commandMenu[i]);
                }
                break;
            case CombatStates.EnemyTurn:
                break;
            case CombatStates.DamageDealt:
                break;
            case CombatStates.End:
                //Displays winning text
                GUI.Label(new Rect(0, 0, 100, 100), "\n" + winner.wrestlerName + " wins!"); 
                break;
        }

        //Shows health information for both wrestlers
        string healths = player.wrestlerName + ": " + player.Health + "\n" + enemy.wrestlerName + ": " + enemy.Health + "\n" + "Turn Cost: " + player.CurrentTurnCost + "/" + player.MaxTurnCost;

        GUI.color = Color.white;
        //Prints health information out to screen
        GUI.Label(new Rect(0, 35, 200, 50), healths);
        //Prints recent action out to screen
        GUI.Label(new Rect(55, 135, 250, 150), actionMessage);
    }

    void AddSelectionToCommandList()
    {
        //Gets current selection
        string currentSelection = currentMenu[selectedOption];

        //Selection cost variable
        int selectionCost = 0;

        //Checks to see what selection it was
        switch (currentSelection)
        {
            case "Rest":
                selectionCost = 5;
                break;
            case "Set Up":
                selectionCost = 3;
                break;
            default:
                if (player.knownAttacks.ContainsKey(currentSelection))
                {
                    selectionCost = player.knownAttacks[currentSelection].Cost;
                }
                else if (player.knownTaunts.ContainsKey(currentSelection))
                {
                    selectionCost = player.knownTaunts[currentSelection].Cost;
                }
                break;
        }
        if (player.CurrentTurnCost + selectionCost < player.MaxTurnCost)
        {
            player.CurrentTurnCost += selectionCost;
            commandMenu.Insert(commandMenu.Count - 1, currentSelection);
            player.CommandChain.Add(currentSelection);
        }
        else
        {
            actionMessage = "Not enough stamina points!";
        }
    }

    void RemoveSelectionFromCommandList()
    {
        //Gets current selection
        string currentSelection = currentMenu[selectedOption];

        //Ends turn if the end turn option is selected
        if(currentSelection == endTurnOption)
        {
            EndTurn(player, enemy, CombatStates.EnemyTurn);

            //Returns function
            return;
        }

        //Selection cost variable
        int selectionCost = 0;

        //Checks to see what selection it was
        switch (currentSelection)
        {
            case "Rest":
                selectionCost = 5;
                break;
            case "Set Up":
                selectionCost = 3;
                break;
            default:
                if (player.knownAttacks.ContainsKey(currentSelection))
                {
                    selectionCost = player.knownAttacks[currentSelection].Cost;
                }
                else if (player.knownTaunts.ContainsKey(currentSelection))
                {
                    selectionCost = player.knownTaunts[currentSelection].Cost;
                }
                break;
        }
        player.CurrentTurnCost -= selectionCost;
        commandMenu.Remove(currentSelection);
        player.CommandChain.Remove(currentSelection);
    }

    void EndTurn(Wrestler currentWrestler, Wrestler target, CombatStates nextTurn)
    {
        List<string> commands = currentWrestler.CommandChain;
        string turnString = currentWrestler.wrestlerName + " ";

        Taunt.AttackEffect attackModifier = null;

        foreach(string command in commands)
        {
            switch (command)
            {
                case "Rest":
                    currentWrestler.Rest();
                    turnString += "recovered health\n";
                    break;
                case "Set Up":
                    turnString += "set up opponent\n";
                    break;
                default:
                    if (currentWrestler.knownTaunts.ContainsKey(command))
                    {
                        //Sets attack modifier
                        attackModifier = currentWrestler.knownTaunts[command].AttackModifier;

                        turnString += "uses " + currentWrestler.knownTaunts[command].Name + "\n";
                    }
                    else if (currentWrestler.knownAttacks.ContainsKey(command))
                    {
                        //Gets damage of selected attack
                        int damage = currentWrestler.knownAttacks[command].Damage;
                        //Modifies damage
                        if (attackModifier != null)
                        {
                            damage = attackModifier(damage);
                            attackModifier = null;
                        }

                        //Deals damage
                        target.TakeDamage(damage);

                        turnString += "uses " + currentWrestler.knownAttacks[command].Name + ", deals " + damage + " damage\n";
                    }
                    break;
            }

            turnString += "          ";
        }

        //Sets action message to turn string
        actionMessage = turnString;
        //Resets player data
        currentWrestler.ResetWrestler();

        //Checks the target's health
        if (target.Health == 0)
        {
            //Makes the current wrestler the winner and ends the match
            winner = currentWrestler;
            currentState = CombatStates.End;
        }
        else
        {
            //Continues to the next turn
            currentState = nextTurn;
        }
    }

    void ResetMenuData()
    {
        //Clears command menu
        commandMenu.Clear();
        commandMenu.Add(endTurnOption);

        //Sets current menu to the default menu
        currentMenu = menu;
        displayedMenu = currentMenu;

        //Resets selected option
        selectedOption = 0;
    }
}
