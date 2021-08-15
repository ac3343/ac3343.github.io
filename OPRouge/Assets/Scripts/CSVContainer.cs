using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CSVContainer<T>
{
    List<T> cards;
    public delegate T CSVInterpreter(string[] csvAtts);

    public List<T> AllItems
    {
        get { return cards; }
    }
    public List<T> ItemsRandomized
    {
        get { return Utils.GetRandomOrder<T>(cards); }
    }

    // Start is called before the first frame update
    public CSVContainer(string a_sFileName, CSVInterpreter a_Method)
    {
        cards = new List<T>();
        string cardCSV = CSV.Read(a_sFileName);
        string[] stringDeck = cardCSV.Split('\n');
        for(int i = 0; i < stringDeck.Length - 1; i++)
        {
            string[] cardAttributes = stringDeck[i].Split(',');
            cards.Add(a_Method(cardAttributes));
        }
    }
}
