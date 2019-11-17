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
    
    // Start is called before the first frame update
    void Start()
    {
        //Begins combat on the player's turn
        currentState = CombatStates.PlayerTurn;

        //Creates the player and enemy wrestlers
        player = Instantiate(playerPrefab).GetComponent<Wrestler>();
        enemy = Instantiate(enemyPrefab).GetComponent<Wrestler>();

        //Creates a punch attack and sets its info
        Attack punch = new Attack();
        punch.SetAttackInfo("Punch", 4);

        //Teaches punch to the player and the enemy
        player.LearnAttack(punch);
        enemy.LearnAttack(punch);
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
                    //Selects attack
                    Attack selectedAttack = player.learnedAttacks[0];

                    //Undergoes the wrestler turn
                    WrestlerTurn(player, enemy, selectedAttack, CombatStates.EnemyTurn);
                }
                break;
            case CombatStates.EnemyTurn:
                if (Input.GetKeyDown(KeyCode.Space))
                {
                    //Selects acttack
                    Attack selectedAttack = enemy.learnedAttacks[0];

                    //Undergoes the wrestler turn
                    WrestlerTurn(enemy, player, selectedAttack, CombatStates.PlayerTurn);
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
