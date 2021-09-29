using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public enum BattleStates
{
    BattleStart,
    DrawPhase,
    CardSelection,
    BattlePhase,
    BattleEnd,
    Results
}

public class BattleManager : MonoBehaviour
{
    NotifContainer m_Notifications;
    BattleStates m_CurrentState;
    Deck<Card> m_Deck;

    [SerializeField]
    GameObject m_CardPrefab;

    List<CardDisplay> m_Hand;

    Character enemy;
    Crew m_EnemyCrew;

    Character[] m_PlayerCharacters;
    Crew m_PlayerCrew;

    event CardEffect m_CardsToPlay;

    BattleUI m_BattleUI;


    // Start is called before the first frame update
    void Start()
    {
        //Finds notifications container 
        m_Notifications = FindObjectOfType<NotifContainer>();

        //Initializes battle state
        m_CurrentState = BattleStates.BattleStart;

        //Creates player characters
        CSVContainer<Card> luffyCards = new CSVContainer<Card>("luffy.csv", Card.FromCSV);
        Character luffy = new Character("Luffy", luffyCards.AllItems.ToArray(), 100);

        CSVContainer<Card> namiCards = new CSVContainer<Card>("nami.csv", Card.FromCSV);
        Character nami = new Character("Nami", namiCards.AllItems.ToArray(), 100);

        CSVContainer<Card> zoroCards = new CSVContainer<Card>("zoro.csv", Card.FromCSV);
        Character zoro = new Character("Zoro", zoroCards.AllItems.ToArray(), 100);

        m_PlayerCharacters = new Character[] { luffy, nami, zoro };

        //Creates crew from player characters
        m_PlayerCrew = new Crew(m_PlayerCharacters);


        //Loads cards in from file and creates a deck from them
        //CSVContainer<Card> csvCards = new CSVContainer<Card>("deck.csv", Card.FromCSV);
        m_Deck = m_PlayerCrew.GetCrewDeck();

        m_Hand = new List<CardDisplay>();

        //Creates enemy
        CSVContainer<Card> enemyCards = new CSVContainer<Card>("enemy.csv", Card.FromCSV);
        enemy = new Character("Gwen", enemyCards.AllItems.ToArray(), 100);

        m_EnemyCrew = new Crew(new Character[] { enemy });

        m_BattleUI = gameObject.GetComponent<BattleUI>();
    }

    // Update is called once per frame
    void Update()
    {
        if (m_BattleUI.InTransition)
        {
            //Debug.Log("Transitioning");
            return;
        }
        switch (m_CurrentState)
        {
            case BattleStates.BattleStart:
                ToNextState();
                break;
            case BattleStates.DrawPhase:
                DrawHands();
                ToNextState();
                break;
            case BattleStates.CardSelection:
                if (Input.GetKeyUp(KeyCode.Space))
                {
                    ToNextState();
                }
                break;
            case BattleStates.BattlePhase:
                EnemyTurn();
                ToNextState();
                break;
            case BattleStates.BattleEnd:
                Debug.Log("Enemy has been slain");
                ToNextState();
                break;
            case BattleStates.Results:
                break;
        }
    }

     void ToNextState()
     {
        string outroText = "Ending " + m_CurrentState.ToString();

        if (m_CurrentState == BattleStates.BattlePhase && !IsBattleOver())
        {
            m_CurrentState = BattleStates.DrawPhase;
        }
        else
        {
            m_CurrentState++;
        }

        switch (m_CurrentState)
        {
            case BattleStates.BattleStart:
                break;
            case BattleStates.DrawPhase:
                break;
            case BattleStates.CardSelection:
                break;
            case BattleStates.BattlePhase:
                break;
            case BattleStates.BattleEnd:
                break;
            case BattleStates.Results:
                break;
        }

        string introText = "Begining " + m_CurrentState.ToString();

        m_BattleUI.ToNextState(outroText, introText);

    }

    bool IsBattleOver()
    {
        return enemy.m_fHealth <= 0;
    }

    void DrawHands()
    {
        for(int i = m_Hand.Count - 1; i >= 0; i--)
        {
            Destroy(m_Hand[i].gameObject);
            m_Hand.RemoveAt(i);
        }

        m_Deck.DrawHand();

        for(int i = 0; i < m_Deck.Hand.Count; i++)
        {
            DisplayCard(i);
        }

        //Makes instantiated hand playable
        MakeHandPlayable();
    }

    private void DisplayCard(int i)
    {
        GameObject newCard = Instantiate(m_CardPrefab, new Vector3(0, 0), Quaternion.identity, GameObject.Find("Hand").transform);

        RectTransform cardRect = newCard.GetComponent<RectTransform>();
        //cardRect.position = new Vector3(-100 + i * 50, 5);
        cardRect.anchoredPosition = new Vector2(-300 + i * 140, 5);

        m_Hand.Add(newCard.GetComponent<CardDisplay>());
        m_Hand[i].DisplayCard(m_Deck.Hand[i]);
    }

    void MakeHandPlayable()
    {
        //Loops through displayed hand
        for (int i = 0; i < m_Hand.Count; i++)
        {
            MakeCardPlayable(i);
        }
    }

    private void MakeCardPlayable(int i)
    {
        //Gets card at the hand position i
        int index = i;
        Card currentCard = m_Deck.GetCardInHand(index);

        //Creates function to call when card is played
        void PlayCard()
        {
            currentCard.PlayCrewEffect(m_EnemyCrew);
            m_Deck.PlayCard(index);
        }

        m_Hand[i].PassInClickCard(PlayCard);
    }

    GameObject InstFromDeck(string[] param)
    {
        //Instatiate new card under game object
        GameObject newObj = Instantiate(m_CardPrefab, GameObject.Find("Canvas").transform);

        //Gets text fields from children
        Text[] fields = newObj.GetComponentsInChildren<Text>();

        if(fields[0].text == "Name")
        {
            fields[0].text = param[0];
            fields[1].text = param[2];
        }
        else
        {
            fields[0].text = param[2];
            fields[1].text = param[0];
        }

        //Returns new card
        return newObj;
    }

    void EnemyTurn()
    {
        //Selects random crew memeber
        Character target = m_PlayerCrew.GetRandomCharacter(0);

        //Plays random cards from hand on that crew member
        Deck<Card> enemyDeck = m_EnemyCrew.GetCrewDeck();
        enemyDeck.DrawHand();
        Card[] randomCards = enemyDeck.GetRandomCardsInHand(2);

        for(int i = 0; i < 2; i++)
        {
            Card currentCard = randomCards[i];
            Debug.Log(enemy.m_sName + " uses " + currentCard.Name);
            enemyDeck.PlayCard(i);
            currentCard.PlayCrewEffect(m_PlayerCrew);
        }
    }

    private void OnGUI()
    {
        GUI.Label(new Rect(50, 50, 100, 100), m_CurrentState.ToString());
        string playerHealth = "Luffy: " + m_PlayerCharacters[0].m_fHealth + "\nNami: " + m_PlayerCharacters[1].m_fHealth + "\nZoro: " + m_PlayerCharacters[2].m_fHealth;
        GUI.Label(new Rect(50, 150, 100, 100), playerHealth);
    }
}