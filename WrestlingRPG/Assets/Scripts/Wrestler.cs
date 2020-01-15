using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Wrestler : MonoBehaviour
{
    
    //Fields
    public string wrestlerName;
    int health;
    
    //Attacks
    public List<Attack> learnedAttacks = new List<Attack>();
    public Dictionary<string, Attack> knownAttacks = new Dictionary<string, Attack>();

    //Taunts
    public List<Taunt> learnedTaunts = new List<Taunt>();
    public Dictionary<string, Taunt> knownTaunts = new Dictionary<string, Taunt>();

    //Command info
    List<string> commandChain;
    const int beginningTurnCost = 10;
    int maxTurnCost;
    int currentTurnCost;

    public List<string> CommandChain
    {
        get { return commandChain; }
    }
    public int Health
    {
        get { return health; }
    }

    public int MaxTurnCost
    {
        get { return maxTurnCost; }
        set { if (value > 5) maxTurnCost = value; }
    }
    public int CurrentTurnCost
    {
        get { return currentTurnCost; }
        set { if (value >= 0)
                currentTurnCost = value;
            else if (value < 0)
                currentTurnCost = 0;
                
        }
    }
    // Start is called before the first frame update
    void Start()
    {
        health = 10;

        //Creates commannd chain
        commandChain = new List<string>();

        //Sets current turn cost
        currentTurnCost = 0;

        maxTurnCost = beginningTurnCost;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void TakeDamage(int damage)
    {
        //Deducts health based on damage
        health -= damage;

        //Keeps health at 0
        if (health < 0)
            health = 0;
    }

    public void Rest()
    {
        //Recovers some health
        health += 2;
    }
    public void LearnAttack(Attack learnedAttack)
    {
        //Adds learnedAttack to list of learned attacks
        learnedAttacks.Add(learnedAttack);

        knownAttacks.Add(learnedAttack.Name, learnedAttack);
    }

    public void LearnTaunt(Taunt learnedTaunt)
    {
        //Adds learnedAttack to list of learned attacks
        learnedTaunts.Add(learnedTaunt);

        knownTaunts.Add(learnedTaunt.Name, learnedTaunt);
    }

    Attack GetRandomAttack()
    {
        //Gets random index from learned attacks list
        int randomIndex = Random.Range(0, learnedAttacks.Count);

        //Returns attack at random index
        return learnedAttacks[randomIndex];
    }

    Taunt GetRandomTaunt()
    {
        //Gets random index from learned taunts list
        int randomIndex = Random.Range(0, learnedTaunts.Count);

        //Returns taunt at random index
        return learnedTaunts[randomIndex];
    }

    string GetRandomCommand()
    {
        string command = "";

        //Gets random number between 1 and 4
        int commandValue = Random.Range(1, 5);

        //Sets command based on command value
        switch (commandValue)
        {
            case 1:
                command = "Set up";
                break;
            case 2:
                command = "Rest";
                break;
            case 3:
                Attack randAttack = GetRandomAttack();
                command = randAttack.Name;
                break;
            case 4:
                Taunt randTaunt = GetRandomTaunt();
                command = randTaunt.Name;
                break;
        }
        //Returns command
        return command;
    }

    public void RandomizeCommandChain()
    {
        bool chainFull = false;
        do
        {
            //Gets current selection
            string currentSelection = GetRandomCommand();

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
                    if (knownAttacks.ContainsKey(currentSelection))
                    {
                        selectionCost = knownAttacks[currentSelection].Cost;
                    }
                    else if (knownTaunts.ContainsKey(currentSelection))
                    {
                        selectionCost = knownTaunts[currentSelection].Cost;
                    }
                    break;
            }
            if (currentTurnCost + selectionCost < MaxTurnCost)
            {
                currentTurnCost += selectionCost;
                CommandChain.Add(currentSelection);
            }
            else
            {
                chainFull = true;
            }
        } while (!chainFull);
    }

    public void ResetWrestler()
    {
        //Clears commands
        commandChain.Clear();

        //Resets turn cose
        currentTurnCost = 0;
    }
}
