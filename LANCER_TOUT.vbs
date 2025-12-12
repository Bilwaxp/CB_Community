Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\carlhensley\Desktop\CB_ONE"
WshShell.Run "cmd /c FAIRE_TOUT.bat", 1, True
Set WshShell = Nothing




