using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public delegate void ClickCardEffect();
public class CardDisplay : MonoBehaviour
{

    [SerializeField]
    Text[] m_Fields;
    ClickCardEffect m_ccFunction;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void PassInClickCard(ClickCardEffect a_ccFunction)
    {
        m_ccFunction = a_ccFunction;
    }

    public void DisplayCard(Card a_cData)
    {
        m_Fields[0].text = a_cData.Name;
        m_Fields[1].text = a_cData.Description;
        m_Fields[2].text = a_cData.Tag;
        gameObject.SetActive(true);
    }

    public void ClickCard()
    {
        m_ccFunction?.Invoke();
        gameObject.SetActive(false);
    }
}
