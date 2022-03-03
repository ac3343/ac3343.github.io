using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Character
{
    public string m_sName;
    public Card[] m_aCards;
    public float m_fHealth;

    public Character(string a_sName, Card[] a_aCards, float a_fHealth)
    {
        m_sName = a_sName;
        m_aCards = a_aCards;
        m_fHealth = a_fHealth;
    }

    public void TakeDamge(float damage)
    {
        m_fHealth -= damage;
        Debug.Log(m_sName + " took " + damage + " damage and is at " + m_fHealth + " health");

        //Call event if damage kills
    }
}
