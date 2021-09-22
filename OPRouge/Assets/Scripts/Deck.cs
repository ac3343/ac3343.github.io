using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Deck<T>
{
    /*
     * TODO: Move more specific functions to a child class
     */

    T[] m_DeckCards;
    Queue<T> m_PlayDeck;
    List<T> m_Hand;
    List<T> m_Discard;
    List<int> m_CardsToPlay;

    uint m_uMaxHandSize;

    public List<T> Hand
    {
        get { return m_Hand; }
    }

    public int HandSize
    {
        get { return (int)m_uMaxHandSize; }
    }

    public Deck(T[] a_Cards, uint a_uHandSize = 5)
    {
        m_DeckCards = a_Cards;
        m_uMaxHandSize = a_uHandSize;
        m_Hand = new List<T>();
        m_Discard = new List<T>();
        m_CardsToPlay = new List<int>();
        Shuffle();
    }

    public void Shuffle()
    {
        if(m_Discard.Count == 0)
        {
            m_PlayDeck = new Queue<T>(Utils.GetRandomOrder<T>(m_DeckCards));
        }
        else
        {
            m_PlayDeck = new Queue<T>(Utils.GetRandomOrder<T>(m_Discard));
            m_Discard.Clear();
        }
    }

    public void DrawHand()
    {
        DiscardHand();

        int cardsToDraw = (int)m_uMaxHandSize - m_Hand.Count;

        for (uint i = 0; i < cardsToDraw; i++)
        {
            if(m_PlayDeck.Count == 0)
            {
                Shuffle();
            }

            m_Hand.Add(m_PlayDeck.Dequeue());
        }
    }

    public void DiscardCard(int a_uCardIndex)
    {
        if(a_uCardIndex >= m_Hand.Count)
        {
            Debug.LogError("Error: Index of discarded card greater than hand count");
        }
        else
        {
            m_Discard.Add(m_Hand[m_CardsToPlay[a_uCardIndex]]);
            m_Hand.RemoveAt(m_CardsToPlay[a_uCardIndex]);
            m_CardsToPlay.RemoveAt(a_uCardIndex);
        }
    }

    public void ClearHand()
    {
        for(int i = 0; i < m_Hand.Count; i++)
        {
            m_CardsToPlay.Add(i);
        }

        DiscardHand();
    }

    public void DiscardCard()
    {
        DiscardCard(0);
    }

    public void DiscardHand()
    {
        if(m_CardsToPlay.Count > 0)
        {
            m_CardsToPlay.Sort((a, b) => b.CompareTo(a));

            while (m_CardsToPlay.Count > 0)
            {
                DiscardCard();
            }
        }
        
    }

    public void PlayCard(int a_uHandIndex)
    {
        if (m_CardsToPlay.Contains(a_uHandIndex))
        {
            m_CardsToPlay.Remove(a_uHandIndex);
        }
        else
        {
            m_CardsToPlay.Add(a_uHandIndex);
        }

    }

    public void PlayAndDiscardCard(int a_uHandIndex)
    {
        PlayCard(a_uHandIndex);
        DiscardCard();
        //Game where multiple people share a deck?
    }

    public T GetCardInHand(int a_uHandIndex)
    {
        return m_Hand[a_uHandIndex];
    }

    public T[] GetRandomCardsInHand(int a_iCount)
    {
        if (a_iCount >= Hand.Count)
            return m_Hand.ToArray();

        return m_Hand.GetRange(0, a_iCount).ToArray();
    }
}
