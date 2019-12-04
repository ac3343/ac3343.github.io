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

    //Player strike and grapple menu
    List<string> strikeMenu, grappleMenu;


    //Selected menu fields
    int selectedOption;
    List<string> currentMenu;
   
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

        //Creates strike and grapple menu
        strikeMenu = new List<string>();
        grappleMenu = new List<string>();

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


        //Adds back option to strike and grapple menus
        strikeMenu.Add(backOption);
        grappleMenu.Add(backOption);

        //Sets currentMenu to the primary menu
        currentMenu = menu;
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
                    //Goes to attack menu if the Attack option is selected
                    if(currentMenu == menu && selectedOption == 0)
                    {
                        currentMenu = attackMenu;
                    }
                    else if(currentMenu == attackMenu && selectedOption == 3)
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
                    else if(currentMenu == strikeMenu || currentMenu == grappleMenu)
                    {
                        //Selects attack
                        Attack selectedAttack = player.knownAttacks[currentMenu[selectedOption]];

                        //Undergoes the wrestler turn
                        WrestlerTurn(player, enemy, selectedAttack, CombatStates.EnemyTurn);
                    }
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
                for(int i = 0; i < currentMenu.Count; i++)
                {
                    GUI.color = i == selectedOption ? Color.yellow : Color.white;

                    //Prints health information out to screen
                    GUI.Label(new Rect(100, 35 + i*20, 200, 50), currentMenu[i]);
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
        string healths = player.wrestlerName + ": " + player.Health + "\n" + enemy.wrestlerName + ": " + enemy.Health;

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
}
