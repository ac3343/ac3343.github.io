﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

enum BattleStates
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

    Character[] m_PlayerCharacters;
    Crew m_PlayerCrew;


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
        Crew m_PlayerCrew = new Crew(m_PlayerCharacters);


        //Loads cards in from file and creates a deck from them
        //CSVContainer<Card> csvCards = new CSVContainer<Card>("deck.csv", Card.FromCSV);
        m_Deck = m_PlayerCrew.GetCrewDeck();

        m_Hand = new List<CardDisplay>();

        //Draws first hand
        DrawHands();

        //Creates enemy
        enemy = new Character("Gwen",luffyCards.AllItems.ToArray(), 100);
    }

    // Update is called once per frame
    void Update()
    {
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
                //DrawHands();
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
            currentCard.PlayEffect(enemy);
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
}