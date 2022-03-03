using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CSVContainer<T>
{
    List<T> entrys;
    public delegate T CSVInterpreter(string[] csvColumns);

    public List<T> AllItems
    {
        get { return entrys; }
    }
    public List<T> ItemsRandomized
    {
        get { return Utils.GetRandomOrder<T>(entrys); }
    }

    // Start is called before the first frame update
    public CSVContainer(string a_sFileName, CSVInterpreter a_Interpreter)
    {
        //Creates new list of cards
        entrys = new List<T>();

        //Reads in the give csv file
        string CSVString = CSV.Read(a_sFileName);

        //Breaks the file up into rows
        string[] entryStrings = CSVString.Split('\n');

        //Loops through each row in the csv
        for(int i = 0; i < entryStrings.Length - 1; i++)
        {
            //Gets fields for current entry
            string[] cardFields = entryStrings[i].Split(',');

            //Creates card based on this field
            entrys.Add(a_Interpreter(cardFields));
        }
    }
}
