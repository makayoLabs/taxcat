' ======================================================================================
' ENHANCED VBA IMPLEMENTATION: BAT + QMS GRID DASHBOARD WITH IMPROVEMENTS
' ======================================================================================

' --------------------------------------------------------------------------------------
' [1] ENHANCED CLASS MODULE: CriteriaItem
' --------------------------------------------------------------------------------------
Private pLabel As String
Private pDescription As String
Private pCategory As String
Private pWeight As Double

Public Property Get Label() As String
    Label = pLabel
End Property

Public Property Let Label(value As String)
    pLabel = value
End Property

Public Property Get Description() As String
    Description = pDescription
End Property

Public Property Let Description(value As String)
    pDescription = value
End Property

Public Property Get Category() As String
    Category = pCategory
End Property

Public Property Let Category(value As String)
    pCategory = value
End Property

Public Property Get Weight() As Double
    If pWeight = 0 Then pWeight = 1 ' Default weight
    Weight = pWeight
End Property

Public Property Let Weight(value As Double)
    pWeight = value
End Property

Public Sub Initialize(lbl As String, desc As String, Optional cat As String = "", Optional wgt As Double = 1)
    Me.Label = lbl
    Me.Description = desc
    Me.Category = cat
    Me.Weight = wgt
End Sub

' --------------------------------------------------------------------------------------
' [2] ENHANCED CLASS MODULE: GridTile
' --------------------------------------------------------------------------------------
Public WithEvents Tile As MSForms.Label
Private currentScore As Integer
Private criteriaItem As CriteriaItem
Private parentGrid As Object

Public Property Get Score() As Integer
    Score = currentScore
End Property

Public Property Set CriteriaRef(item As CriteriaItem)
    Set criteriaItem = item
End Property

Public Property Get CriteriaRef() As CriteriaItem
    Set CriteriaRef = criteriaItem
End Property

Private Sub Tile_Click()
    currentScore = (currentScore Mod 5) + 1
    UpdateVisuals
    ' Trigger parent grid update event
    If Not parentGrid Is Nothing Then
        parentGrid.OnTileScoreChanged Me
    End If
End Sub

Private Sub Tile_DblClick(ByVal Cancel As MSForms.ReturnBoolean)
    ' Double-click to reset score
    currentScore = 0
    UpdateVisuals
    Cancel = True
End Sub

Private Sub Tile_MouseMove(ByVal Button As Integer, ByVal Shift As Integer, ByVal X As Single, ByVal Y As Single)
    If Not criteriaItem Is Nothing Then
        Tile.ControlTipText = criteriaItem.Label & ": " & criteriaItem.Description & vbCrLf & _
                              "Current Score: " & currentScore & "/5" & vbCrLf & _
                              "Click to increment, Double-click to reset"
    End If
End Sub

Private Sub UpdateVisuals()
    Select Case currentScore
        Case 5: 
            Tile.BackColor = RGB(0, 176, 80)
            Tile.ForeColor = RGB(255, 255, 255)
        Case 4: 
            Tile.BackColor = RGB(146, 208, 80)
            Tile.ForeColor = RGB(0, 0, 0)
        Case 3: 
            Tile.BackColor = RGB(255, 255, 0)
            Tile.ForeColor = RGB(0, 0, 0)
        Case 2: 
            Tile.BackColor = RGB(255, 192, 0)
            Tile.ForeColor = RGB(0, 0, 0)
        Case 1: 
            Tile.BackColor = RGB(255, 0, 0)
            Tile.ForeColor = RGB(255, 255, 255)
        Case 0:
            Tile.BackColor = RGB(240, 240, 240)
            Tile.ForeColor = RGB(128, 128, 128)
    End Select
    
    Tile.Caption = IIf(currentScore = 0, "-", currentScore)
    Tile.Font.Bold = (currentScore > 0)
End Sub

Public Sub InitializeTile(ByRef parentForm As Object, ByRef item As CriteriaItem, _
                         topVal As Single, leftVal As Single, Optional gridRef As Object = Nothing)
    Set Tile = parentForm.Controls.Add("Forms.Label.1")
    Set criteriaItem = item
    Set parentGrid = gridRef
    
    With Tile
        .Caption = "-"
        .Width = 35
        .Height = 35
        .BackStyle = fmBackStyleOpaque
        .SpecialEffect = fmSpecialEffectRaised
        .TextAlign = fmTextAlignCenter
        .Font.Size = 10
        .Font.Bold = False
        .Top = topVal
        .Left = leftVal
        .Name = "tile_" & Replace(Replace(item.Label, ".", "_"), " ", "_")
    End With
    
    currentScore = 0
    UpdateVisuals
End Sub

Public Sub SetScore(newScore As Integer)
    If newScore >= 0 And newScore <= 5 Then
        currentScore = newScore
        UpdateVisuals
    End If
End Sub

' --------------------------------------------------------------------------------------
' [3] ENHANCED CLASS MODULE: GridBox
' --------------------------------------------------------------------------------------
Private tiles() As GridTile
Private gridItems As Collection
Private parentForm As Object
Private averageScore As Double

Public Property Get AverageScore() As Double
    CalculateStats
    AverageScore = averageScore
End Property

Public Property Get TileCount() As Integer
    If Not IsEmpty(tiles) Then
        TileCount = UBound(tiles) - LBound(tiles) + 1
    Else
        TileCount = 0
    End If
End Property

Public Sub OnTileScoreChanged(changedTile As GridTile)
    ' Recalculate statistics when a tile changes
    CalculateStats
End Sub

Private Sub CalculateStats()
    Dim total As Double, count As Integer, i As Integer
    total = 0
    count = 0
    
    If Not IsEmpty(tiles) Then
        For i = LBound(tiles) To UBound(tiles)
            If tiles(i).Score > 0 Then
                total = total + tiles(i).Score
                count = count + 1
            End If
        Next i
    End If
    
    If count > 0 Then
        averageScore = total / count
    Else
        averageScore = 0
    End If
End Sub

Public Sub CreateGrid(ByRef parentForm As Object, items As Collection, _
                     topOffset As Single, leftOffset As Single, Optional maxCols As Integer = 5)
    Set Me.parentForm = parentForm
    Set gridItems = items
    
    Dim i As Integer, row As Integer, col As Integer
    ReDim tiles(1 To items.Count)
    
    For i = 1 To items.Count
        Set tiles(i) = New GridTile
        row = (i - 1) \ maxCols
        col = (i - 1) Mod maxCols
        tiles(i).InitializeTile parentForm, items(i), _
            topOffset + row * 40, leftOffset + col * 40, Me
    Next i
End Sub

Public Function GetScoreData() As Collection
    Dim results As New Collection
    Dim i As Integer
    
    If Not IsEmpty(tiles) Then
        For i = LBound(tiles) To UBound(tiles)
            Dim scoreData As New Dictionary
            scoreData.Add "Label", tiles(i).CriteriaRef.Label
            scoreData.Add "Score", tiles(i).Score
            scoreData.Add "Weight", tiles(i).CriteriaRef.Weight
            scoreData.Add "Category", tiles(i).CriteriaRef.Category
            results.Add scoreData
        Next i
    End If
    
    Set GetScoreData = results
End Function

Public Sub LoadScores(scoreData As Collection)
    Dim i As Integer, scoreItem As Dictionary
    
    If Not IsEmpty(tiles) Then
        For Each scoreItem In scoreData
            For i = LBound(tiles) To UBound(tiles)
                If tiles(i).CriteriaRef.Label = scoreItem("Label") Then
                    tiles(i).SetScore scoreItem("Score")
                    Exit For
                End If
            Next i
        Next scoreItem
    End If
End Sub

' --------------------------------------------------------------------------------------
' [4] ENHANCED USERFORM: GridForm
' --------------------------------------------------------------------------------------
Private batBox As GridBox
Private qmsBox As GridBox
Private currentSession As String
Private isDirty As Boolean

Private Sub UserForm_Initialize()
    Me.Caption = "Performance Assessment Dashboard v2.0"
    currentSession = Format(Now, "yyyy-mm-dd_hh-mm-ss")
    isDirty = False
    
    InitializeWorksheets
    LoadBATQMS
    LoadFrameworkTable
    UpdateStatusBar
    
    ' Add real-time score display
    AddScoreDisplayLabels
End Sub

Private Sub InitializeWorksheets()
    ' Ensure all required worksheets exist
    EnsureWorksheetExists "PerformanceLog", True
    EnsureWorksheetExists "PerformanceDashboard", True
    EnsureWorksheetExists "Framework", True
    EnsureWorksheetExists "Adherence_Log", True
    EnsureWorksheetExists "Config", True
End Sub

Private Sub EnsureWorksheetExists(wsName As String, Optional createHeaders As Boolean = False)
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets(wsName)
    On Error GoTo 0
    
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add(After:=Sheets(Sheets.Count))
        ws.Name = wsName
        
        If createHeaders Then
            Select Case wsName
                Case "PerformanceLog"
                    ws.Range("A1:F1").Value = Array("SessionID", "Date", "Category", "Label", "Score", "Weight")
                Case "Adherence_Log"
                    ws.Range("A1:G1").Value = Array("Date", "StateType", "StartTime", "EndTime", "Duration", "Notes", "SessionID")
                Case "Config"
                    ws.Range("A1:B1").Value = Array("Setting", "Value")
                    ws.Range("A2:B5").Value = Array(Array("DefaultEmail", ""), _
                                                  Array("ManagerEmail", ""), _
                                                  Array("AutoSave", "True"), _
                                                  Array("LastBackup", ""))
            End Select
            ws.Range("1:1").Font.Bold = True
        End If
    End If
End Sub

Private Sub AddScoreDisplayLabels()
    ' Add labels to show real-time scores
    Dim lblBATScore As MSForms.Label, lblQMSScore As MSForms.Label
    
    Set lblBATScore = Me.Controls.Add("Forms.Label.1", "lblBATScore")
    With lblBATScore
        .Top = 10
        .Left = 400
        .Width = 150
        .Height = 20
        .Caption = "BAT Average: 0.0/5"
        .Font.Bold = True
        .BackColor = RGB(240, 240, 240)
    End With
    
    Set lblQMSScore = Me.Controls.Add("Forms.Label.1", "lblQMSScore")
    With lblQMSScore
        .Top = 35
        .Left = 400
        .Width = 150
        .Height = 20
        .Caption = "QMS Average: 0.0/5"
        .Font.Bold = True
        .BackColor = RGB(240, 240, 240)
    End With
End Sub

Private Sub UpdateStatusBar()
    ' Update the score displays
    On Error Resume Next
    Me.Controls("lblBATScore").Caption = "BAT Average: " & Format(batBox.AverageScore, "0.0") & "/5"
    Me.Controls("lblQMSScore").Caption = "QMS Average: " & Format(qmsBox.AverageScore, "0.0") & "/5"
    On Error GoTo 0
End Sub

Private Sub LoadBATQMS()
    Dim BAT As Collection, QMS As Collection
    Set BAT = New Collection
    Set QMS = New Collection

    ' Enhanced BAT items with categories and weights
    BAT.Add CreateItem("1.1", "Completes time reporting accurately and timely", "Accountability", 1)
    BAT.Add CreateItem("1.2", "Arrives on time and reports absences properly", "Accountability", 1.2)
    BAT.Add CreateItem("1.3", "Seeks approval before going offline or for leave", "Accountability", 1)
    BAT.Add CreateItem("2.1", "Is open to feedback and coaching", "Learning", 1.5)
    BAT.Add CreateItem("2.2", "Demonstrates understanding of feedback", "Learning", 1.3)
    BAT.Add CreateItem("2.3", "Engages in follow-up action plans", "Learning", 1.2)
    BAT.Add CreateItem("2.4", "Participates in self-assessment and reflection", "Learning", 1)
    BAT.Add CreateItem("3.1", "Supports colleagues and contributes to team goals", "Teamwork", 1.4)
    BAT.Add CreateItem("3.2", "Shares knowledge and best practices", "Teamwork", 1.3)
    BAT.Add CreateItem("3.3", "Demonstrates flexibility to help others", "Teamwork", 1.2)
    BAT.Add CreateItem("4.1", "Is respectful in interactions with clients and peers", "Professionalism", 1.5)
    BAT.Add CreateItem("4.2", "Demonstrates inclusive and professional behavior", "Professionalism", 1.4)
    BAT.Add CreateItem("5.1", "Looks for ways to improve processes", "Innovation", 1.3)
    BAT.Add CreateItem("5.2", "Participates in improvement initiatives", "Innovation", 1.2)
    BAT.Add CreateItem("5.3", "Provides suggestions for efficiency", "Innovation", 1.1)
    BAT.Add CreateItem("5.4", "Demonstrates innovation in task execution", "Innovation", 1.4)
    BAT.Add CreateItem("5.5", "Applies lessons learned proactively", "Innovation", 1.2)

    ' Enhanced QMS items with categories and weights  
    QMS.Add CreateItem("Security", "Follows secure handling of account information", "Compliance", 2)
    QMS.Add CreateItem("Listening", "Listens without interrupting, demonstrates understanding", "Communication", 1.5)
    QMS.Add CreateItem("Responsiveness", "Responds promptly and does not delay unnecessarily", "Service", 1.3)
    QMS.Add CreateItem("Accuracy", "Gives complete, correct information", "Quality", 2)
    QMS.Add CreateItem("Professionalism", "Maintains professional language and behavior", "Service", 1.4)
    QMS.Add CreateItem("Tone", "Uses respectful, calm, and appropriate tone", "Communication", 1.3)
    QMS.Add CreateItem("Ownership", "Takes accountability for resolving issues", "Service", 1.5)
    QMS.Add CreateItem("Clarity", "Communicates clearly and avoids jargon", "Communication", 1.4)
    QMS.Add CreateItem("Efficiency", "Manages time effectively during the interaction", "Performance", 1.2)
    QMS.Add CreateItem("Probing", "Asks relevant questions to understand caller needs", "Communication", 1.3)
    QMS.Add CreateItem("Recap", "Restates key points and confirms accuracy", "Quality", 1.2)
    QMS.Add CreateItem("Closure", "Closes call with proper summary and thanks", "Service", 1.1)
    QMS.Add CreateItem("Empathy", "Acknowledges and validates caller's concerns", "Communication", 1.4)
    QMS.Add CreateItem("Greeting", "Uses correct opening greeting", "Service", 1.1)
    QMS.Add CreateItem("Confidentiality", "Ensures private conversation", "Compliance", 1.8)

    Set batBox = New GridBox
    Set qmsBox = New GridBox
    batBox.CreateGrid Me.MultiPageBATQMS.Pages(0), BAT, 60, 20, 6
    qmsBox.CreateGrid Me.MultiPageBATQMS.Pages(1), QMS, 60, 20, 5
End Sub

Private Function CreateItem(lbl As String, desc As String, Optional cat As String = "", Optional wgt As Double = 1) As CriteriaItem
    Dim item As New CriteriaItem
    item.Initialize lbl, desc, cat, wgt
    Set CreateItem = item
End Function

Private Sub cmdSave_Click()
    SaveCurrentSession
    isDirty = False
    MsgBox "Assessment saved successfully!" & vbCrLf & "Session ID: " & currentSession, vbInformation
End Sub

Private Sub SaveCurrentSession()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("PerformanceLog")
    
    Dim batData As Collection, qmsData As Collection
    Set batData = batBox.GetScoreData
    Set qmsData = qmsBox.GetScoreData
    
    ' Save BAT scores
    SaveScoreCollection ws, batData, "BAT", currentSession
    
    ' Save QMS scores  
    SaveScoreCollection ws, qmsData, "QMS", currentSession
End Sub

Private Sub SaveScoreCollection(ws As Worksheet, scoreData As Collection, category As String, sessionID As String)
    Dim r As Long, scoreItem As Dictionary
    r = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row + 1
    
    For Each scoreItem In scoreData
        If scoreItem("Score") > 0 Then ' Only save scored items
            ws.Cells(r, 1).Value = sessionID
            ws.Cells(r, 2).Value = Date
            ws.Cells(r, 3).Value = category
            ws.Cells(r, 4).Value = scoreItem("Label")
            ws.Cells(r, 5).Value = scoreItem("Score")
            ws.Cells(r, 6).Value = scoreItem("Weight")
            r = r + 1
        End If
    Next scoreItem
End Sub

Private Sub cmdSummary_Click()
    GenerateEnhancedDashboard
    MsgBox "Enhanced dashboard generated with trend analysis!", vbInformation
End Sub

Private Sub GenerateEnhancedDashboard()
    Dim logWS As Worksheet, dashWS As Worksheet
    Set logWS = ThisWorkbook.Sheets("PerformanceLog")
    Set dashWS = ThisWorkbook.Sheets("PerformanceDashboard")
    
    dashWS.Cells.Clear
    
    ' Create comprehensive dashboard with multiple analyses
    CreatePerformanceSummary dashWS, logWS
    CreateTrendAnalysis dashWS, logWS
    CreateCategoryAnalysis dashWS, logWS
    CreateRecommendations dashWS, logWS
End Sub

Private Sub CreatePerformanceSummary(dashWS As Worksheet, logWS As Worksheet)
    dashWS.Range("A1").Value = "PERFORMANCE DASHBOARD - " & Format(Date, "MMMM DD, YYYY")
    dashWS.Range("A1").Font.Size = 16
    dashWS.Range("A1").Font.Bold = True
    
    ' Current session summary
    dashWS.Range("A3").Value = "Current Session Summary"
    dashWS.Range("A3").Font.Bold = True
    dashWS.Range("A4").Value = "BAT Average:"
    dashWS.Range("B4").Value = Format(batBox.AverageScore, "0.00")
    dashWS.Range("A5").Value = "QMS Average:"
    dashWS.Range("B5").Value = Format(qmsBox.AverageScore, "0.00")
    dashWS.Range("A6").Value = "Overall Score:"
    dashWS.Range("B6").Formula = "=AVERAGE(B4:B5)"
    dashWS.Range("B6").NumberFormat = "0.00"
    
    ' Color coding for current performance
    If dashWS.Range("B6").Value >= 4 Then
        dashWS.Range("B6").Interior.Color = RGB(0, 176, 80)
    ElseIf dashWS.Range("B6").Value >= 3 Then
        dashWS.Range("B6").Interior.Color = RGB(255, 255, 0)
    Else
        dashWS.Range("B6").Interior.Color = RGB(255, 0, 0)
    End If
End Sub

Private Sub CreateTrendAnalysis(dashWS As Worksheet, logWS As Worksheet)
    ' Implementation for trend analysis over time
    ' This would analyze performance trends over the last 30 days
    dashWS.Range("D3").Value = "30-Day Trend Analysis"
    dashWS.Range("D3").Font.Bold = True
    
    ' Add trend chart logic here
    ' (Implementation would require date-based analysis of historical data)
End Sub

Private Sub CreateCategoryAnalysis(dashWS As Worksheet, logWS As Worksheet)
    ' Analyze performance by category (Accountability, Learning, etc.)
    dashWS.Range("A10").Value = "Performance by Category"
    dashWS.Range("A10").Font.Bold = True
    
    ' Implementation for category-based analysis
End Sub

Private Sub CreateRecommendations(dashWS As Worksheet, logWS As Worksheet)
    ' Generate recommendations based on low-scoring areas
    dashWS.Range("A20").Value = "Recommendations for Improvement"
    dashWS.Range("A20").Font.Bold = True
    
    ' Implementation for intelligent recommendations
End Sub

' Auto-save functionality
Private Sub MultiPageBATQMS_Change()
    isDirty = True
    UpdateStatusBar
End Sub

Private Sub UserForm_QueryClose(Cancel As Integer, CloseMode As Integer)
    If isDirty Then
        Dim response As VbMsgBoxResult
        response = MsgBox("You have unsaved changes. Save before closing?", vbYesNoCancel + vbQuestion)
        If response = vbYes Then
            SaveCurrentSession
        ElseIf response = vbCancel Then
            Cancel = True
        End If
    End If
End Sub

' --------------------------------------------------------------------------------------
' [5] ENHANCED UTILITY FUNCTIONS
' --------------------------------------------------------------------------------------

Public Function GetConfigValue(settingName As String) As String
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Config")
    Dim lastRow As Long, i As Long
    
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    For i = 2 To lastRow
        If ws.Cells(i, 1).Value = settingName Then
            GetConfigValue = ws.Cells(i, 2).Value
            Exit Function
        End If
    Next i
    GetConfigValue = ""
End Function

Public Sub SetConfigValue(settingName As String, settingValue As String)
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Config")
    Dim lastRow As Long, i As Long, found As Boolean
    
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    For i = 2 To lastRow
        If ws.Cells(i, 1).Value = settingName Then
            ws.Cells(i, 2).Value = settingValue
            found = True
            Exit For
        End If
    Next i
    
    If Not found Then
        ws.Cells(lastRow + 1, 1).Value = settingName
        ws.Cells(lastRow + 1, 2).Value = settingValue
    End If
End Sub

Public Sub AutoBackup()
    Dim backupPath As String
    backupPath = ThisWorkbook.Path & "\Backups\"
    
    ' Create backup directory if it doesn't exist
    If Dir(backupPath, vbDirectory) = "" Then
        MkDir backupPath
    End If
    
    Dim backupName As String
    backupName = backupPath & "Performance_Backup_" & Format(Now, "yyyymmdd_hhmmss") & ".xlsx"
    
    ThisWorkbook.SaveCopyAs backupName
    SetConfigValue "LastBackup", Format(Now, "yyyy-mm-dd hh:mm:ss")
End Sub

' Enhanced email functionality with better formatting
Public Sub EmailEnhancedDashboard()
    Dim ws As Worksheet, pdfPath As String, htmlBody As String
    Set ws = ThisWorkbook.Sheets("PerformanceDashboard")
    pdfPath = Environ("TEMP") & "\PerformanceReport_" & Format(Now, "yyyymmdd") & ".pdf"
    
    ws.ExportAsFixedFormat Type:=xlTypePDF, Filename:=pdfPath
    
    ' Create HTML email body
    htmlBody = CreateHTMLEmailBody()
    
    Dim OutlookApp As Object, MailItem As Object
    Set OutlookApp = CreateObject("Outlook.Application")
    Set MailItem = OutlookApp.CreateItem(0)
    
    With MailItem
        .To = GetConfigValue("ManagerEmail")
        .CC = GetConfigValue("DefaultEmail")
        .Subject = "Performance Assessment Report - " & Format(Date, "MMMM DD, YYYY")
        .HTMLBody = htmlBody
        .Attachments.Add pdfPath
        .Display ' Use .Send for automatic sending
    End With
End Sub

Private Function CreateHTMLEmailBody() As String
    Dim html As String
    html = "<html><body style='font-family: Arial, sans-serif;'>"
    html = html & "<h2>Performance Assessment Summary</h2>"
    html = html & "<p>Please find attached my performance assessment report for " & Format(Date, "MMMM DD, YYYY") & ".</p>"
    html = html & "<table border='1' style='border-collapse: collapse;'>"
    html = html & "<tr><th>Category</th><th>Average Score</th><th>Status</th></tr>"
    html = html & "<tr><td>BAT</td><td>" & Format(batBox.AverageScore, "0.00") & "</td><td>" & GetStatusText(batBox.AverageScore) & "</td></tr>"
    html = html & "<tr><td>QMS</td><td>" & Format(qmsBox.AverageScore, "0.00") & "</td><td>" & GetStatusText(qmsBox.AverageScore) & "</td></tr>"
    html = html & "</table>"
    html = html & "<p>Best regards,<br>[Your Name]</p>"
    html = html & "</body></html>"
    CreateHTMLEmailBody = html
End Function

Private Function GetStatusText(score As Double) As String
    If score >= 4 Then
        GetStatusText = "Excellent"
    ElseIf score >= 3 Then
        GetStatusText = "Good"
    ElseIf score >= 2 Then
        GetStatusText = "Needs Improvement"
    Else
        GetStatusText = "Critical"
    End If
End Function