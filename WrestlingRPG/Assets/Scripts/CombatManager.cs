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

    //Turn fields
    const int maxTurnCost = 10;
    List<string> commandChain;
    List<string> commandMenu;
    string endTurnOption = "End Turn";
    int currentTurnCost;
   
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

        //Teaches player taunt
        player.LearnTaunt(TauntList.Roar);

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

        //Creates commannd chain and comand menu
        commandChain = new List<string>();
        commandMenu = new List<string>();

        //Adds end turn option to comand menu
        commandMenu.Add(endTurnOption);

        //Sets displayed menu equal to current menu
        displayedMenu = currentMenu;

        //Sets current turn cost
        currentTurnCost = 0;
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
                        if (!commandChain.Contains(currentMenu[selectedOption]) || currentMenu == strikeMenu || currentMenu == grappleMenu)
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
                    //Selects acttack
                    Attack selectedAttack = enemy.learnedAttacks[0];

                    //Undergoes the wrestler turn
                    WrestlerTurn(enemy, player, selectedAttack, CombatStates.PlayerTurn);

                    //Sets current menu to default menu
                    currentMenu = menu;

                    //Resets selected option
                    selectedOption = 0;
                }
                break;
            case CombatStates.DamageDealt:
                break;
            case CombatStates.End:
                //Declares winner after action message
                actionMessage += "\n" + winner.wrestlerName + " wins!";
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
                    GUI.Label(new Rect(250 , 250 + 50 * i, 200, 50), commandMenu[i]);
                }
                break;
            case CombatStates.EnemyTurn:
                break;
            case CombatStates.DamageDealt:
                break;
            case CombatStates.End:
                break;
        }

        //Shows health information for both wrestlers
        string healths = player.wrestlerName + ": " + player.Health + "\n" + enemy.wrestlerName + ": " + enemy.Health + "\n" + "Turn Cost: " + currentTurnCost + "/" + maxTurnCost;

        GUI.color = Color.white;
        //Prints health information out to screen
        GUI.Label(new Rect(0, 35, 200, 50), healths);
        //Prints recent action out to screen
        GUI.Label(new Rect(55, 135, 200, 50), actionMessage);
    }

    void WrestlerTurn(Wrestler currentWrestler, Wrestler target, Attack selectedAttack, CombatStates nextTurn)
    {
        //Deals damage to target based on attack's damage value
        target.TakeDamage(selectedAttack.Damage);

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

        //Creates a string detailing the turn
        actionMessage = currentWrestler.wrestlerName + " used " + selectedAttack.Name + " and dealt " + selectedAttack.Damage + " damage.";
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
        if (currentTurnCost + selectionCost < maxTurnCost)
        {
            currentTurnCost += selectionCost;
            //commandMenu.Add(currentSelection);
            commandMenu.Insert(commandMenu.Count - 1, currentSelection);
            commandChain.Add(currentSelection);
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
        currentTurnCost -= selectionCost;
        //commandMenu.Add(currentSelection);
        commandMenu.Remove(currentSelection);
        commandChain.Remove(currentSelection);
    }
}
