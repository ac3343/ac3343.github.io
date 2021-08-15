using UnityEditor;
using UnityEngine;

public class CardCreator : EditorWindow
{
    string m_cardName = "";
    string m_cardDesc = "";
    string m_tag1 = "";
    string m_fileToRead = "";

    [MenuItem("Tools/Cards/Card Creator")]
    public static void ShowWindow()
    {
        GetWindow(typeof(CardCreator));
    }

    private void OnGUI()
    {
        GUILayout.Label("Card Creator", EditorStyles.boldLabel);

        m_cardName = EditorGUILayout.TextField("Name", m_cardName);
        m_cardDesc = EditorGUILayout.TextField("Description", m_cardDesc);
        m_tag1 = EditorGUILayout.TextField("Tag", m_tag1);

        if(GUILayout.Button("Create Card"))
        {
            CreateCard();
        }

        m_fileToRead = EditorGUILayout.TextField("Card To Load", m_fileToRead);
        if (GUILayout.Button("Load Card"))
        {
            string newCard = LoadCard(m_fileToRead);
            if(newCard != "")
            {
                string[] newCardParams = newCard.Split(',');
                m_cardName = newCardParams[0];
                m_cardDesc = newCardParams[1];
                m_tag1 = newCardParams[2];
            }            
        }
        if (GUILayout.Button("Load Deck"))
        {
            Debug.Log(LoadDeck());
        }
    }

    private void CreateCard()
    {
        CSV.Write(LoadDeck() + ToCSV(), "deck.csv");
    }

    private string ToCSV()
    {
        return  m_cardName + ',' + m_cardDesc + ',' + m_tag1 + '\n';
    }

    private string LoadCard(string a_card)
    {
        //Loads deck and splits it into an array
        string deckString = LoadDeck();
        string[] deckArray = deckString.Split('\n');

        //Loops through deck array, searching for matching card
        for(int i = 0; i < deckArray.Length; i++)
        {
            string[] cardParams = deckArray[i].Split(',');
            if (cardParams[0] == a_card) { 
                return deckArray[i];
            }
        }

        Debug.LogError("Card " + a_card + " not found");
        return "";
    }
    private string LoadDeck()
    {
        return CSV.Read("deck.csv");
    }
}
