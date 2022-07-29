using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

enum TransitionStates
{
    PlayingIntro,
    NotTransitioning,
    PlayingOutro
}

public class BattleUI : MonoBehaviour
{
    private TransitionStates m_TranState;
    const float m_cTranTime = 1.0f;
    float m_fCurrentTranTime;

    [SerializeField]
    Text m_TranTextObject;
    Color m_TextColor;
    string m_sIntroText;


    public bool InTransition
    {
        get { return m_TranState != TransitionStates.NotTransitioning; }
    }

    // Start is called before the first frame update
    void Start()
    {
        m_TranState = 0;
        m_fCurrentTranTime = 0.0f;
        m_sIntroText = "BattleStart";
        m_TranTextObject.text = m_sIntroText;
        m_TextColor = m_TranTextObject.color;
    }

    // Update is called once per frame
    void Update()
    {
        if (InTransition)
        {
            m_fCurrentTranTime += Time.deltaTime;

            float transparency = (m_cTranTime - m_fCurrentTranTime) / m_cTranTime;
            m_TextColor = new Color(m_TextColor.r, m_TextColor.g, m_TextColor.b, transparency);
            m_TranTextObject.color = m_TextColor;

            if(m_fCurrentTranTime >= m_cTranTime)
            {
                m_TranState = m_TranState == TransitionStates.PlayingOutro ? 
                    TransitionStates.PlayingIntro : m_TranState + 1;

                if(m_TranState == TransitionStates.PlayingIntro)
                {
                    m_TranTextObject.text = m_sIntroText;
                }

                m_fCurrentTranTime = 0.0f;
            }
        }
    }

    public void ToNextState(string a_sOutroText, string a_sIntroText)
    {
        m_TranState = TransitionStates.PlayingOutro;
        m_sIntroText = a_sIntroText;

        m_TranTextObject.text = a_sOutroText;
    }

}
