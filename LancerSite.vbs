Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\carlhensley\Desktop\CB_ONE"
WshShell.Run "cmd /c START_SERVER.bat", 1, False
Set WshShell = Nothing








