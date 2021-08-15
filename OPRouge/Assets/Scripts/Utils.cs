using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Utils
{
    public static List<T> GetRandomOrder<T>(List<T> a_Enumerable)
    {
        List<T> randomList = new List<T>(GetRandomOrder<T>(a_Enumerable.ToArray()));

        return randomList;
    }

    public static T[] GetRandomOrder<T>(T[] a_Enumerable)
    {
        //Gets length of array
        int count = a_Enumerable.Length;

        //Gets indexes from that array and puts them in a list
        List<int> indexes = new List<int>(GetIndexesFromArray<T>(a_Enumerable));

        //Creates new array for random items
        T[] newArr = new T[count];

        //Loops through contents of indexes
        while(indexes.Count > 0)
        {
            //Gets random index in the indexes list
            int randomIndex = Random.Range(0, indexes.Count);

            //Gets T at random index
            T valueToAdd = a_Enumerable[indexes[randomIndex]];
            
            //Adds T to array at the loaded index
            newArr[count - indexes.Count] = valueToAdd;

            //Removes random index from indexes list
            indexes.RemoveAt(randomIndex);
        }

        return newArr;
    }

    public static int[] GetIndexesFromArray<T>(T[] a_Array)
    {
        int count = a_Array.Length;

        int[] indexes = new int[count];

        for (int i = 0; i < count; i++)
        {
            indexes[i] = i;
        }

        return indexes;
    }
}
