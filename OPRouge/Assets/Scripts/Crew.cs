using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Crew
{
    List<List<Character>> m_CrewMembers;
    List<Deck<Card>> m_CrewDecks;

    public Crew(Character[] a_Crew)
    {
        m_CrewMembers = new List<List<Character>>();
        m_CrewMembers.Add(new List<Character>(a_Crew));

        m_CrewDecks = new List<Deck<Card>>();

        List<Card> allCrewCards = new List<Card>();

        for(int i = 0; i < a_Crew.Length; i++)
        {
            allCrewCards.AddRange(m_CrewMembers[0][i].m_aCards);
        }

        m_CrewDecks.Add(new Deck<Card>(allCrewCards.ToArray()));
    }


}
