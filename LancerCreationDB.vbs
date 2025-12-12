Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\carlhensley\Desktop\CB_ONE"
WshShell.Run "cmd /c CREER_BD_NOW.bat", 1, False
Set WshShell = Nothing





