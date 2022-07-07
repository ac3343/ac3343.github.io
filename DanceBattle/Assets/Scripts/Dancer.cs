using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Dancer : MonoBehaviour
{
    [SerializeField]
    private GameObject[] poses;
    private GameObject u_CurrentPose;

    [SerializeField]
    private Material aura;
    private Color[] auraColors;

    private string s_Combo;

    private float f_hype;
    private const float MAX_HYPE = 50;
    private float f_storedHype;
    private float f_hypeMultiplier;

    private int i_style;
    private const int DEFAULT_STYLE = 3;
    private int i_styleBuff;

    private Slider hypeSlider;
    private Slider styleSlider;

    public string Combo
    {
        get { return s_Combo; }
    }

    // Start is called before the first frame update
    void Start()
    {
        auraColors = new Color[] { new Color(0, 0, 1), new Color(1, 0, 1), new Color(0, 1, 1), new Color(1, 1, 0) };
        SetPose(0);

        f_hype = 0;
        f_hypeMultiplier = 1;

        hypeSlider = GameObject.FindGameObjectWithTag("UI_Hype").GetComponent<Slider>();
        styleSlider = GameObject.FindGameObjectWithTag("UI_Style").GetComponent<Slider>();

        i_styleBuff = 0;
        TurnStart();
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKeyUp(KeyCode.UpArrow)){
            ContinueCombo(0);
        }
        else if (Input.GetKeyUp(KeyCode.LeftArrow))
        {
            ContinueCombo(1);
        }
        else if (Input.GetKeyUp(KeyCode.RightArrow))
        {
            ContinueCombo(2);
        }
        else if (Input.GetKeyUp(KeyCode.DownArrow))
        {
            ContinueCombo(3);
        }
    }

    private void SetPose(uint i)
    {
        //Hides poses
        foreach (GameObject p in poses)
        {
            p.SetActive(false);
        }        

        //Shows pose
        u_CurrentPose = poses[i];
        u_CurrentPose.SetActive(true);

        //Sets outline color and size
        aura.SetColor("_Color", auraColors[i]);
        aura.SetFloat("_Outline", .01f * i + .01f);        
    }

    private void ContinueCombo(uint i)
    {
        if(i_style <= 0)
        {
            return;
        }
        //Adds pose to combo
        s_Combo += i;

        //Sets pose
        SetPose(i);

        Debug.Log(s_Combo);

        if (s_Combo.Length >= 3)
        {
            //Activates combo effect
            Dances.ComboEffect(this);

            //Clears combo
            s_Combo = "";

            //Decrements style gague
            i_style -= 1;
            styleSlider.value = i_style;

            PrintDancer();
        }
    }

    private void TurnStart()
    {
        //Resets style bar
        i_style = DEFAULT_STYLE + i_styleBuff;
        i_styleBuff = 0;
        styleSlider.value = i_style;
    }

    private void EndTurn()
    {

    }

    public void ApplyHypeBuff(float multiplier)
    {
        f_hypeMultiplier += multiplier;
    }

    public void ApplyStyleBuff(int multiplier)
    {
        i_styleBuff += multiplier;
    }

    public void BuildHype(float hype)
    {
        f_hype += hype * f_hypeMultiplier;
        f_hypeMultiplier = 1;
        hypeSlider.value = f_hype / MAX_HYPE;
    }

    private void PrintDancer()
    {
        Debug.Log("Hype: " + f_hype + " Buff: " + f_hypeMultiplier + "\nStyle: " + i_style + " Buff: " + i_styleBuff);
    }
}
