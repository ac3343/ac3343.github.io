using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Crew
{
    Character[] m_AllCharacters;
    List<List<Character>> m_CrewMembers;
    List<Deck<Card>> m_CrewDecks;
    List<string> m_CrewNames;
    int m_iCrewCount;
    float m_fMaxCrewHealth;
    float m_fCrewHealth;

    public Crew(Character[] a_Crew)
    {
        m_AllCharacters = a_Crew;
        m_CrewMembers = new List<List<Character>>();
        m_CrewMembers.Add(new List<Character>(a_Crew));
        m_CrewNames = new List<string>();
        m_iCrewCount = 1;

        m_CrewDecks = new List<Deck<Card>>();

        List<Card> allCrewCards = new List<Card>();

        for(int i = 0; i < a_Crew.Length; i++)
        {
            allCrewCards.AddRange(m_CrewMembers[0][i].m_aCards);
        }

        m_CrewDecks.Add(new Deck<Card>(allCrewCards.ToArray()));

        m_fMaxCrewHealth = 0;
        string crewName = "";
        foreach(Character c in m_CrewMembers[0])
        {
            m_fMaxCrewHealth += c.m_fHealth;
            crewName += c.m_sName;
        }
        m_CrewNames.Add(crewName);
        m_fCrewHealth = m_fMaxCrewHealth;
    }

    public void TakeDamge(float damage)
    {
        m_fCrewHealth -= damage;
        Debug.Log(m_CrewNames[0] + " took " + damage + " damage and is at " + m_fCrewHealth + " health");
    }

    public Deck<Card> GetCrewDeck(int a_iCrewNum)
    {
        return m_CrewDecks[a_iCrewNum];
    }

    public Deck<Card> GetCrewDeck()
    {
        return GetCrewDeck(0);
    }

    public Character GetRandomCharacter(int a_iCrew)
    {
        return m_CrewMembers[a_iCrew][Random.Range(0, 3)];
    }
}
