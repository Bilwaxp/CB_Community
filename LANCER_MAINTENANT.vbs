Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\carlhensley\Desktop\CB_ONE"
WshShell.Run "cmd /c DEMARRER_AUTO.bat", 1, False
Set WshShell = Nothing




