@echo off
setlocal enabledelayedexpansion
net session
title Cyber Windows
color 0A

netsh advfirewall set allprofiles state on
echo Setting basic firewall rules..
netsh advfirewall firewall set rule name="Remote Assistance (DCOM-In)" new enable=no 
netsh advfirewall firewall set rule name="Remote Assistance (PNRP-In)" new enable=no 
netsh advfirewall firewall set rule name="Remote Assistance (RA Server TCP-In)" new enable=no 
netsh advfirewall firewall set rule name="Remote Assistance (SSDP TCP-In)" new enable=no 
netsh advfirewall firewall set rule name="Remote Assistance (SSDP UDP-In)" new enable=no 
netsh advfirewall firewall set rule name="Remote Assistance (TCP-In)" new enable=no 
netsh advfirewall firewall set rule name="Telnet Server" new enable=no 
netsh advfirewall firewall set rule name="netcat" new enable=no

echo Disabling services
sc stop TapiSrv
sc config TapiSrv start= disabled
sc stop TlntSvr
sc config TlntSvr start= disabled
sc stop ftpsvc
sc config ftpsvc start= disabled
sc stop SNMP
sc config SNMP start= disabled
sc stop SessionEnv
sc config SessionEnv start= disabled
sc stop TermService
sc config TermService start= disabled
sc stop UmRdpService
sc config UmRdpService start= disabled
sc stop SharedAccess
sc config SharedAccess start= disabled
sc stop 
sc config 
sc stop SSDPSRV
sc config SSDPSRV start= disabled
sc stop W3SVC
sc config W3SVC start= disabled
sc stop SNMPTRAP
sc config SNMPTRAP start= disabled
sc stop 
sc config 
sc stop RpcSs
sc config RpcSs start= disabled
sc stop HomeGroupProvider
sc config HomeGroupProvider start= disabled
sc stop HomeGroupListener
sc config HomeGroupListener start= disabled
sc stop msftpsvc
sc config msftpsvc start= disabled

echo setting password policy
net accounts /lockoutthreshold:5 /MINPWLEN:8 /MAXPWAGE:30 /MINPWAGE:1 /UNIQUEPW:5 

echo changing some security options
reg ADD "HKLM\SYSTEM\CurrentControlSet\services\LanmanServer\Parameters" /v autodisconnect /t REG_DWORD /d 45 /f 
reg ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v EnableInstallerDetection /t REG_DWORD /d 1 /f
reg ADD "HKLM\SYSTEM\CurrentControlSet\Control\Lsa" /v restrictanonymous /t REG_DWORD /d 1 /f 
reg ADD "HKLM\SYSTEM\CurrentControlSet\Control\Lsa" /v restrictanonymoussam /t REG_DWORD /d 1 /f 
reg ADD "HKLM\SYSTEM\CurrentControlSet\Control\Lsa /v everyoneincludesanonymous" /t REG_DWORD /d 0 /f 
reg ADD "HKLM\SYSTEM\CurrentControlSet\services\LanmanWorkstation\Parameters" /v EnablePlainTextPassword /t REG_DWORD /d 0 /f
reg ADD "HKLM\SYSTEM\CurrentControlSet\services\LanmanServer\Parameters" /v NullSessionShares /t REG_MULTI_SZ /d "" /f
reg ADD "HKLM\SYSTEM\CurrentControlSet\services\Netlogon\Parameters" /v RequireStrongKey /t REG_DWORD /d 1 /f
reg ADD "HKLM\SYSTEM\CurrentControlSet\services\Netlogon\Parameters" /v RequireSignOrSeal /t REG_DWORD /d 1 /f
reg ADD "HKLM\SYSTEM\CurrentControlSet\services\Netlogon\Parameters" /v SignSecureChannel /t REG_DWORD /d 1 /f
reg ADD "HKLM\SYSTEM\CurrentControlSet\services\Netlogon\Parameters" /v SealSecureChannel /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\WindowsUpdate\Auto Update" /v AUOptions /t REG_DWORD /d 4 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v AutoInstallMinorUpdates /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v NoAutoUpdate /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v AUOptions /t REG_DWORD /d 4 /f
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsUpdate\Auto Update" /v AUOptions /t REG_DWORD /d 4 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate" /v DisableWindowsUpdateAccess /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate" /v ElevateNonAdmins /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoWindowsUpdate /t REG_DWORD /d 0 /f
reg add "HKLM\SYSTEM\Internet Communication Management\Internet Communication" /v DisableWindowsUpdateAccess /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\WindowsUpdate" /v DisableWindowsUpdateAccess /t REG_DWORD /d 0 /f
reg ADD "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v ShowSuperHidden /t REG_DWORD /d 1 /f
reg ADD "HKCU\SYSTEM\CurrentControlSet\Services\CDROM" /v AutoRun /t REG_DWORD /d 1 /f
reg ADD HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced /v Hidden /t REG_DWORD /d 1 /f
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender" /v "DisableAntiSpyware" /t REG_DWORD /d 0 /f
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender" /v "ServiceKeepAlive" /t REG_DWORD /d 1 /f
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender\Real-Time Protection" /v "DisableIOAVProtection" /t REG_DWORD /d 0 /f
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender\Real-Time Protection" /v "DisableRealtimeMonitoring" /t REG_DWORD /d 0 /f
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender\Scan" /v "CheckForSignaturesBeforeRunningScan" /t REG_DWORD /d 1 /f
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender\Scan" /v "DisableHeuristics" /t REG_DWORD /d 0 /f
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Attachments" /v "ScanWithAntiVirus" /t REG_DWORD /d 3 /f
reg ADD HKLM\SYSTEM\CurrentControlSet\services\LanmanServer\Parameters /v autodisconnect /t REG_DWORD /d 45 /f
reg ADD HKLM\SYSTEM\CurrentControlSet\Control\Lsa /v LimitBlankPasswordUse /t REG_DWORD /d 1 /f



echo Setting password never expires
wmic UserAccount set PasswordExpires=True
wmic UserAccount set PasswordChangeable=True
wmic UserAccount set PasswordRequired=True

echo Setting auditing success and failure for all categories
auditpol /set /category:* /success:enable
auditpol /set /category:* /failure:enable

net accounts /UNIQUEPW:24 /MAXPWAGE:60 /MINPWAGE:1 /MINPWLEN:12 /lockoutthreshold:5
powershell /c "Get-LocalUser Guest | Disable-LocalUser"
powershell /c "Get-LocalUser Administrator | Disable-LocalUser"

echo Firewall
netsh advfirewall set currentprofile state on
netsh advfirewall set allprofiles state on
netsh advfirewall set domainprofile state on
netsh advfirewall set privateprofile state on
netsh advfirewall set publicprofile state on
reg add HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU /v AutoInstallMinorUpdates /t REG_DWORD /d 1 /f
reg add HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU /v NoAutoUpdate /t REG_DWORD /d 0 /f
reg add HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU /v AUOptions /t REG_DWORD /d 4 /f
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsUpdate\Auto Update" /v AUOptions /t REG_DWORD /d 4 /f
reg add HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate /v DisableWindowsUpdateAccess /t REG_DWORD /d 0 /f
reg add HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate /v ElevateNonAdmins /t REG_DWORD /d 0 /f
reg add HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer /v NoWindowsUpdate /t REG_DWORD /d 0 /f
reg add "HKLM\SYSTEM\Internet Communication Management\Internet Communication" /v DisableWindowsUpdateAccess /t REG_DWORD /d 0 /f
reg add HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\WindowsUpdate /v DisableWindowsUpdateAccess /t REG_DWORD /d 0 /f

echo Audit
auditpol /set /category:"Account Logon" /success:enable
auditpol /set /category:"Account Logon" /failure:enable
auditpol /set /category:"Account Management" /success:enable
auditpol /set /category:"Account Management" /failure:enable
auditpol /set /category:"DS Access" /success:enable
auditpol /set /category:"DS Access" /failure:enable
auditpol /set /category:"Logon/Logoff" /success:enable
auditpol /set /category:"Logon/Logoff" /failure:enable
auditpol /set /category:"Object Access" /success:enable
auditpol /set /category:"Object Access" /failure:enable
auditpol /set /category:"Policy Change" /success:enable
auditpol /set /category:"Policy Change" /failure:enable
auditpol /set /category:"Privilege Use" /success:enable
auditpol /set /category:"Privilege Use" /failure:enable
auditpol /set /category:"Detailed Tracking" /success:enable
auditpol /set /category:"Detailed Tracking" /failure:enable
auditpol /set /category:"System" /success:enable 
auditpol /set /category:"System" /failure:enable

echo services
sc stop TapiSrv
sc config TapiSrv start= disabled
sc stop TlntSvr
sc config TlntSvr start= disabled
sc stop ftpsvc
sc config ftpsvc start= disabled
sc stop SNMP
sc config SNMP start= disabled
sc stop SessionEnv
sc config SessionEnv start= disabled
sc stop TermService
sc config TermService start= disabled
sc stop UmRdpService
sc config UmRdpService start= disabled
sc stop SharedAccess
sc config SharedAccess start= disabled
sc stop remoteRegistry 
sc config remoteRegistry start= disabled
sc stop SSDPSRV
sc config SSDPSRV start= disabled
sc stop W3SVC
sc config W3SVC start= disabled
sc stop SNMPTRAP
sc config SNMPTRAP start= disabled
sc stop remoteAccess
sc config remoteAccess start= disabled
sc stop RpcSs
sc config RpcSs start= disabled
sc stop HomeGroupProvider
sc config HomeGroupProvider start= disabled
sc stop HomeGroupListener
sc config HomeGroupListener start= disabled

powershell [Reflection.Assembly]::LoadWithPartialName("""System.Windows.Forms""");[Windows.Forms.MessageBox]::show("""Please Reboot the Virtual Machine to apply settings""", """CyberPatriot""")
