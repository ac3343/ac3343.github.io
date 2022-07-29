using System.IO;
using UnityEditor;
using UnityEngine;

public class CSV
{
    public static void Write(string csv, string file)
    {
            // The target file path e.g.
        #if UNITY_EDITOR
            var folder = Application.streamingAssetsPath;

            if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);
        #else
            var folder = Application.persistentDataPath;
        #endif

            var filePath = Path.Combine(folder, file);

            using (var writer = new StreamWriter(filePath, false))
            {
                writer.Write(csv);
            }

            // Or just
            //File.WriteAllText(content);

            Debug.Log($"CSV file written to \"{filePath}\"");

        #if UNITY_EDITOR
            AssetDatabase.Refresh();
        #endif
    }

    public static string Read(string file)
    {

        // The target file path e.g.
#if UNITY_EDITOR
        var folder = Application.streamingAssetsPath;

        if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);
#else
        var folder = Application.persistentDataPath;
#endif

        var filePath = Path.Combine(folder, file);

        string readContent = "";

        using (var reader = new StreamReader(filePath, false))
        {
            string line = reader.ReadToEnd();
            while(line != "")
            {
                readContent += line;
                line = reader.ReadToEnd();
            }
            reader.Close();
        }


        // Or just
        //File.WriteAllText(content);

        Debug.Log($"CSV file read from \"{filePath}\"");

#if UNITY_EDITOR
        AssetDatabase.Refresh();
#endif

        return readContent;
    }
}
