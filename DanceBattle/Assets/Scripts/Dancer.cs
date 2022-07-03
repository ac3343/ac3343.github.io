using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Dancer : MonoBehaviour
{
    [SerializeField]
    private GameObject[] poses;
    private GameObject u_CurrentPose;

    [SerializeField]
    private Material aura;
    private Color[] auraColors;

    private string s_Combo;

    // Start is called before the first frame update
    void Start()
    {
        auraColors = new Color[] { new Color(0, 0, 1), new Color(1, 0, 1), new Color(0, 1, 1), new Color(1, 1, 0) };
        SetPose(0);
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
        //Adds pose to combo
        s_Combo += i;

        //Sets pose
        SetPose(i);

        Debug.Log(s_Combo);

        if (s_Combo.Length >= 3)
        {
            //Activates combo effect

            //Clears combo
            s_Combo = "";
        }
    }
}
