' ======================================================================================
' ENHANCED BAT ASSESSMENT SYSTEM - ALIGNED WITH OFFICIAL CRA FRAMEWORK v2.1
' ======================================================================================

' --------------------------------------------------------------------------------------
' [1] ENHANCED CLASS MODULE: CriteriaItem (Updated)
' --------------------------------------------------------------------------------------
Private pLabel As String
Private pDescription As String
Private pCategory As String
Private pWeight As Double
Private pQuestionNumber As String
Private pIsRequired As Boolean

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
    If pWeight = 0 Then pWeight = 1
    Weight = pWeight
End Property

Public Property Let Weight(value As Double)
    pWeight = value
End Property

Public Property Get QuestionNumber() As String
    QuestionNumber = pQuestionNumber
End Property

Public Property Let QuestionNumber(value As String)
    pQuestionNumber = value
End Property

Public Property Get IsRequired() As Boolean
    IsRequired = pIsRequired
End Property

Public Property Let IsRequired(value As Boolean)
    pIsRequired = value
End Property

Public Sub Initialize(qNum As String, lbl As String, desc As String, cat As String, _
                     Optional wgt As Double = 1, Optional required As Boolean = True)
    Me.QuestionNumber = qNum
    Me.Label = lbl
    Me.Description = desc
    Me.Category = cat
    Me.Weight = wgt
    Me.IsRequired = required
End Sub

' --------------------------------------------------------------------------------------
' [2] ENHANCED CLASS MODULE: BATTile (Renamed from GridTile)
' --------------------------------------------------------------------------------------
Public WithEvents Tile As MSForms.Label
Private currentScore As String ' Changed to String to handle "N/A", "Yes", "No", etc.
Private criteriaItem As CriteriaItem
Private parentGrid As Object
Private validScores As Collection

Public Property Get Score() As String
    Score = currentScore
End Property

Public Property Set CriteriaRef(item As CriteriaItem)
    Set criteriaItem = item
    InitializeValidScores
End Property

Public Property Get CriteriaRef() As CriteriaItem
    Set CriteriaRef = criteriaItem
End Property

Private Sub InitializeValidScores()
    Set validScores = New Collection
    ' Default scoring options based on BAT framework
    validScores.Add "Not Rated"
    validScores.Add "Yes"
    validScores.Add "No"
    validScores.Add "Not Demonstrated"
    validScores.Add "N/A"
End Sub

Private Sub Tile_Click()
    CycleScore
    UpdateVisuals
    If Not parentGrid Is Nothing Then
        parentGrid.OnTileScoreChanged Me
    End If
End Sub

Private Sub CycleScore()
    Dim currentIndex As Integer, i As Integer
    
    ' Find current score index
    For i = 1 To validScores.Count
        If validScores(i) = currentScore Then
            currentIndex = i
            Exit For
        End If
    Next i
    
    ' Cycle to next score
    currentIndex = (currentIndex Mod validScores.Count) + 1
    currentScore = validScores(currentIndex)
End Sub

Private Sub Tile_DblClick(ByVal Cancel As MSForms.ReturnBoolean)
    currentScore = "Not Rated"
    UpdateVisuals
    Cancel = True
End Sub

Private Sub Tile_MouseMove(ByVal Button As Integer, ByVal Shift As Integer, ByVal X As Single, ByVal Y As Single)
    If Not criteriaItem Is Nothing Then
        Dim tooltip As String
        tooltip = "Q" & criteriaItem.QuestionNumber & ": " & criteriaItem.Label & vbCrLf & _
                  criteriaItem.Description & vbCrLf & _
                  "Current: " & currentScore & vbCrLf & _
                  "Category: " & criteriaItem.Category & vbCrLf & _
                  "Click to change, Double-click to reset"
        Tile.ControlTipText = tooltip
    End If
End Sub

Private Sub UpdateVisuals()
    Select Case currentScore
        Case "Yes": 
            Tile.BackColor = RGB(0, 176, 80)   ' Green
            Tile.ForeColor = RGB(255, 255, 255)
            Tile.Caption = "✓"
        Case "No": 
            Tile.BackColor = RGB(255, 0, 0)    ' Red
            Tile.ForeColor = RGB(255, 255, 255)
            Tile.Caption = "✗"
        Case "Not Demonstrated": 
            Tile.BackColor = RGB(255, 192, 0)  ' Orange
            Tile.ForeColor = RGB(0, 0, 0)
            Tile.Caption = "ND"
        Case "N/A": 
            Tile.BackColor = RGB(128, 128, 128) ' Gray
            Tile.ForeColor = RGB(255, 255, 255)
            Tile.Caption = "N/A"
        Case Else: ' "Not Rated"
            Tile.BackColor = RGB(240, 240, 240)
            Tile.ForeColor = RGB(128, 128, 128)
            Tile.Caption = "-"
    End Select
    
    Tile.Font.Bold = (currentScore <> "Not Rated")
End Sub

Public Sub InitializeTile(ByRef parentForm As Object, ByRef item As CriteriaItem, _
                         topVal As Single, leftVal As Single, Optional gridRef As Object = Nothing)
    Set Tile = parentForm.Controls.Add("Forms.Label.1")
    Set Me.CriteriaRef = item
    Set parentGrid = gridRef
    
    With Tile
        .Width = 50
        .Height = 35
        .BackStyle = fmBackStyleOpaque
        .SpecialEffect = fmSpecialEffectRaised
        .TextAlign = fmTextAlignCenter
        .Font.Size = 10
        .Font.Bold = False
        .Top = topVal
        .Left = leftVal
        .Name = "tile_" & Replace(Replace(item.QuestionNumber, ".", "_"), " ", "_")
    End With
    
    currentScore = "Not Rated"
    UpdateVisuals
End Sub

Public Sub SetScore(newScore As String)
    Dim i As Integer
    For i = 1 To validScores.Count
        If validScores(i) = newScore Then
            currentScore = newScore
            UpdateVisuals
            Exit Sub
        End If
    Next i
End Sub

' --------------------------------------------------------------------------------------
' [3] ENHANCED CLASS MODULE: BATGrid (Renamed from GridBox)
' --------------------------------------------------------------------------------------
Private tiles() As BATTile
Private gridItems As Collection
Private parentForm As Object
Private complianceScore As Double
Private totalQuestions As Integer
Private answeredQuestions As Integer

Public Property Get ComplianceScore() As Double
    CalculateStats
    ComplianceScore = complianceScore
End Property

Public Property Get CompletionRate() As Double
    CalculateStats
    If totalQuestions > 0 Then
        CompletionRate = (answeredQuestions / totalQuestions) * 100
    Else
        CompletionRate = 0
    End If
End Property

Public Property Get TileCount() As Integer
    If Not IsEmpty(tiles) Then
        TileCount = UBound(tiles) - LBound(tiles) + 1
    Else
        TileCount = 0
    End If
End Property

Public Sub OnTileScoreChanged(changedTile As BATTile)
    CalculateStats
End Sub

Private Sub CalculateStats()
    Dim yesCount As Integer, noCount As Integer, totalScored As Integer
    Dim i As Integer
    
    yesCount = 0
    noCount = 0
    totalScored = 0
    answeredQuestions = 0
    totalQuestions = 0
    
    If Not IsEmpty(tiles) Then
        For i = LBound(tiles) To UBound(tiles)
            totalQuestions = totalQuestions + 1
            
            Select Case tiles(i).Score
                Case "Yes"
                    yesCount = yesCount + 1
                    totalScored = totalScored + 1
                    answeredQuestions = answeredQuestions + 1
                Case "No"
                    noCount = noCount + 1
                    totalScored = totalScored + 1
                    answeredQuestions = answeredQuestions + 1
                Case "Not Demonstrated"
                    totalScored = totalScored + 1
                    answeredQuestions = answeredQuestions + 1
                Case "N/A"
                    answeredQuestions = answeredQuestions + 1
                Case Else
                    ' Not Rated - don't count
            End Select
        Next i
    End If
    
    If totalScored > 0 Then
        complianceScore = (yesCount / totalScored) * 100
    Else
        complianceScore = 0
    End If
End Sub

Public Sub CreateGrid(ByRef parentForm As Object, items As Collection, _
                     topOffset As Single, leftOffset As Single, Optional maxCols As Integer = 4)
    Set Me.parentForm = parentForm
    Set gridItems = items
    
    Dim i As Integer, row As Integer, col As Integer
    ReDim tiles(1 To items.Count)
    
    For i = 1 To items.Count
        Set tiles(i) = New BATTile
        row = (i - 1) \ maxCols
        col = (i - 1) Mod maxCols
        tiles(i).InitializeTile parentForm, items(i), _
            topOffset + row * 45, leftOffset + col * 60, Me
    Next i
End Sub

Public Function GetAssessmentData() As Collection
    Dim results As New Collection
    Dim i As Integer
    
    If Not IsEmpty(tiles) Then
        For i = LBound(tiles) To UBound(tiles)
            Dim assessmentData As Object
            Set assessmentData = CreateObject("Scripting.Dictionary")
            assessmentData.Add "QuestionNumber", tiles(i).CriteriaRef.QuestionNumber
            assessmentData.Add "Label", tiles(i).CriteriaRef.Label
            assessmentData.Add "Description", tiles(i).CriteriaRef.Description
            assessmentData.Add "Score", tiles(i).Score
            assessmentData.Add "Category", tiles(i).CriteriaRef.Category
            assessmentData.Add "IsRequired", tiles(i).CriteriaRef.IsRequired
            results.Add assessmentData
        Next i
    End If
    
    Set GetAssessmentData = results
End Function

' --------------------------------------------------------------------------------------
' [4] ENHANCED USERFORM: BATAssessmentForm
' --------------------------------------------------------------------------------------
Private batGrid As BATGrid
Private currentSession As String
Private isDirty As Boolean
Private agentInfo As Object

Private Sub UserForm_Initialize()
    Me.Caption = "CRA Behavioural Assessment Tool (BAT) v2.1"
    Me.Width = 800
    Me.Height = 600
    
    currentSession = Format(Now, "yyyy-mm-dd_hh-mm-ss")
    isDirty = False
    
    Set agentInfo = CreateObject("Scripting.Dictionary")
    
    InitializeWorksheets
    LoadOfficialBATCriteria
    CreateAgentInfoSection
    UpdateStatusDisplay
End Sub

Private Sub CreateAgentInfoSection()
    ' Add agent information input section at the top
    Dim lblTitle As MSForms.Label
    Set lblTitle = Me.Controls.Add("Forms.Label.1", "lblTitle")
    With lblTitle
        .Top = 10
        .Left = 20
        .Width = 400
        .Height = 25
        .Caption = "Agent Information"
        .Font.Size = 14
        .Font.Bold = True
    End With
    
    ' Agent Name
    Dim lblAgentName As MSForms.Label, txtAgentName As MSForms.TextBox
    Set lblAgentName = Me.Controls.Add("Forms.Label.1", "lblAgentName")
    Set txtAgentName = Me.Controls.Add("Forms.TextBox.1", "txtAgentName")
    
    With lblAgentName
        .Top = 45
        .Left = 20
        .Width = 80
        .Height = 20
        .Caption = "Agent Name:"
    End With
    
    With txtAgentName
        .Top = 42
        .Left = 110
        .Width = 150
        .Height = 20
    End With
    
    ' User ID
    Dim lblUserID As MSForms.Label, txtUserID As MSForms.TextBox
    Set lblUserID = Me.Controls.Add("Forms.Label.1", "lblUserID")
    Set txtUserID = Me.Controls.Add("Forms.TextBox.1", "txtUserID")
    
    With lblUserID
        .Top = 45
        .Left = 280
        .Width = 60
        .Height = 20
        .Caption = "User ID:"
    End With
    
    With txtUserID
        .Top = 42
        .Left = 350
        .Width = 100
        .Height = 20
    End With
    
    ' Assessment Period
    Dim lblPeriod As MSForms.Label, cmbPeriod As MSForms.ComboBox
    Set lblPeriod = Me.Controls.Add("Forms.Label.1", "lblPeriod")
    Set cmbPeriod = Me.Controls.Add("Forms.ComboBox.1", "cmbPeriod")
    
    With lblPeriod
        .Top = 45
        .Left = 470
        .Width = 60
        .Height = 20
        .Caption = "Period:"
    End With
    
    With cmbPeriod
        .Top = 42
        .Left = 540
        .Width = 80
        .Height = 20
        .AddItem "P01"
        .AddItem "P02"
        .AddItem "P03"
        .AddItem "P04"
        .AddItem "P05"
        .AddItem "P06"
        .AddItem "P07"
        .AddItem "P08"
        .AddItem "P09"
        .AddItem "P10"
        .AddItem "P11"
        .AddItem "P12"
        .AddItem "P13"
    End With
End Sub

Private Sub LoadOfficialBATCriteria()
    Dim BAT As Collection
    Set BAT = New Collection

    ' Official BAT criteria based on CRA document v2.1
    ' Section 1: Ownership of Duties and Responsibilities
    BAT.Add CreateBATItem("1.1", "Timesheets", "Completes timesheets accurately and on time", "Ownership")
    BAT.Add CreateBATItem("1.2", "Attendance", "Reports to work on time and reports absences in accordance with established guidelines", "Ownership")
    BAT.Add CreateBATItem("1.3", "Offline Activities", "Notifies and seeks TL approval prior to planned offline activities", "Ownership")
    BAT.Add CreateBATItem("1.4", "Communications", "Promptly addresses communications that require immediate action", "Ownership")
    BAT.Add CreateBATItem("1.5", "Technical Issues", "Notifies the appropriate administration of technical issues in a timely manner", "Ownership")
    
    ' Section 2: Appropriately prioritizes work, seeking guidance when necessary
    BAT.Add CreateBATItem("2.1", "Feedback Reception", "Receptive of feedback on their work and applies the proposed solutions", "Prioritization")
    BAT.Add CreateBATItem("2.2", "Production Items", "Promptly addresses all production generated items when notified and requests additional assistance when needed", "Prioritization")
    
    ' Section 3: Contributes to a positive work environment
    BAT.Add CreateBATItem("3.1", "Meeting Participation", "Participates professionally and constructively in meetings as needed", "Work Environment")
    BAT.Add CreateBATItem("3.2", "Adaptability", "Displays a cooperative attitude and is adaptable to change", "Work Environment")
    
    ' Section 4: Works well with others
    BAT.Add CreateBATItem("4.1", "Professional Communication", "Maintains a polite, professional and respectful tone when communicating with others", "Teamwork")
    BAT.Add CreateBATItem("4.2", "Service Delivery", "Delivered the service without receiving any founded formal and justified behavioural complaints (verbal or written)", "Teamwork")
    BAT.Add CreateBATItem("4.3", "CRA Values", "Respects the CRA Core Values", "Teamwork")
    
    ' Section 5: Contributes to an environment of continuous improvement
    BAT.Add CreateBATItem("5.1", "Initiative", "Takes initiatives, through appropriate channels, to make impactful changes", "Improvement")

    Set batGrid = New BATGrid
    batGrid.CreateGrid Me, BAT, 100, 20, 4
End Sub

Private Function CreateBATItem(qNum As String, lbl As String, desc As String, cat As String) As CriteriaItem
    Dim item As New CriteriaItem
    item.Initialize qNum, lbl, desc, cat, 1, True
    Set CreateBATItem = item
End Function

Private Sub UpdateStatusDisplay()
    ' Update compliance and completion statistics
    On Error Resume Next
    Dim lblCompliance As MSForms.Label, lblCompletion As MSForms.Label
    
    Set lblCompliance = Me.Controls("lblCompliance")
    If lblCompliance Is Nothing Then
        Set lblCompliance = Me.Controls.Add("Forms.Label.1", "lblCompliance")
        With lblCompliance
            .Top = 10
            .Left = 500
            .Width = 150
            .Height = 20
            .Font.Bold = True
            .BackColor = RGB(240, 240, 240)
        End With
    End If
    
    Set lblCompletion = Me.Controls("lblCompletion")
    If lblCompletion Is Nothing Then
        Set lblCompletion = Me.Controls.Add("Forms.Label.1", "lblCompletion")
        With lblCompletion
            .Top = 32
            .Left = 500
            .Width = 150
            .Height = 20
            .Font.Bold = True
            .BackColor = RGB(240, 240, 240)
        End With
    End If
    
    lblCompliance.Caption = "Compliance: " & Format(batGrid.ComplianceScore, "0.0") & "%"
    lblCompletion.Caption = "Completion: " & Format(batGrid.CompletionRate, "0.0") & "%"
    
    ' Color coding based on compliance
    If batGrid.ComplianceScore >= 85 Then
        lblCompliance.BackColor = RGB(0, 176, 80)  ' Green
    ElseIf batGrid.ComplianceScore >= 70 Then
        lblCompliance.BackColor = RGB(255, 255, 0)  ' Yellow
    Else
        lblCompliance.BackColor = RGB(255, 0, 0)   ' Red
    End If
    
    On Error GoTo 0
End Sub

Private Sub InitializeWorksheets()
    EnsureWorksheetExists "BAT_Assessments", True
    EnsureWorksheetExists "Agent_Information", True
    EnsureWorksheetExists "Assessment_Reports", True
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
                Case "BAT_Assessments"
                    ws.Range("A1:I1").Value = Array("SessionID", "Date", "AgentName", "UserID", "Period", _
                                                   "QuestionNumber", "Question", "Score", "Category")
                Case "Agent_Information"
                    ws.Range("A1:F1").Value = Array("SessionID", "AgentName", "UserID", "Period", _
                                                   "TeamLeader", "AssessmentDate")
                Case "Assessment_Reports"
                    ws.Range("A1:F1").Value = Array("SessionID", "AgentName", "ComplianceScore", _
                                                   "CompletionRate", "Comments", "ReportDate")
            End Select
            ws.Range("1:1").Font.Bold = True
        End If
    End If
End Sub

' Add command buttons and their event handlers
Private Sub cmdSave_Click()
    If ValidateRequiredFields() Then
        SaveAssessment
        MsgBox "BAT Assessment saved successfully!" & vbCrLf & "Session ID: " & currentSession, vbInformation
        isDirty = False
    Else
        MsgBox "Please complete all required fields before saving.", vbExclamation
    End If
End Sub

Private Function ValidateRequiredFields() As Boolean
    On Error Resume Next
    
    ' Check agent information
    If Trim(Me.Controls("txtAgentName").Text) = "" Then
        ValidateRequiredFields = False
        Exit Function
    End If
    
    If Trim(Me.Controls("txtUserID").Text) = "" Then
        ValidateRequiredFields = False
        Exit Function
    End If
    
    If Me.Controls("cmbPeriod").Text = "" Then
        ValidateRequiredFields = False
        Exit Function
    End If
    
    ' Check if minimum questions are answered
    If batGrid.CompletionRate < 80 Then ' Require at least 80% completion
        ValidateRequiredFields = False
        Exit Function
    End If
    
    ValidateRequiredFields = True
    On Error GoTo 0
End Function

Private Sub SaveAssessment()
    ' Save agent information
    SaveAgentInfo
    
    ' Save assessment data
    SaveAssessmentData
    
    ' Generate report
    GenerateAssessmentReport
End Sub

Private Sub SaveAgentInfo()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Agent_Information")
    
    Dim r As Long
    r = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row + 1
    
    ws.Cells(r, 1).Value = currentSession
    ws.Cells(r, 2).Value = Me.Controls("txtAgentName").Text
    ws.Cells(r, 3).Value = Me.Controls("txtUserID").Text
    ws.Cells(r, 4).Value = Me.Controls("cmbPeriod").Text
    ws.Cells(r, 5).Value = Application.UserName
    ws.Cells(r, 6).Value = Date
End Sub

Private Sub SaveAssessmentData()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("BAT_Assessments")
    
    Dim assessmentData As Collection
    Set assessmentData = batGrid.GetAssessmentData
    
    Dim r As Long, item As Object
    r = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row + 1
    
    For Each item In assessmentData
        ws.Cells(r, 1).Value = currentSession
        ws.Cells(r, 2).Value = Date
        ws.Cells(r, 3).Value = Me.Controls("txtAgentName").Text
        ws.Cells(r, 4).Value = Me.Controls("txtUserID").Text
        ws.Cells(r, 5).Value = Me.Controls("cmbPeriod").Text
        ws.Cells(r, 6).Value = item("QuestionNumber")
        ws.Cells(r, 7).Value = item("Label") & ": " & item("Description")
        ws.Cells(r, 8).Value = item("Score")
        ws.Cells(r, 9).Value = item("Category")
        r = r + 1
    Next item
End Sub

Private Sub GenerateAssessmentReport()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Assessment_Reports")
    
    Dim r As Long
    r = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row + 1
    
    ws.Cells(r, 1).Value = currentSession
    ws.Cells(r, 2).Value = Me.Controls("txtAgentName").Text
    ws.Cells(r, 3).Value = batGrid.ComplianceScore
    ws.Cells(r, 4).Value = batGrid.CompletionRate
    ws.Cells(r, 5).Value = "" ' Comments - can be added later
    ws.Cells(r, 6).Value = Date
End Sub

Private Sub cmdExportPDF_Click()
    ExportToPDF
End Sub

Private Sub ExportToPDF()
    ' Create a summary worksheet for PDF export
    Dim summaryWS As Worksheet
    Set summaryWS = CreateSummaryWorksheet()
    
    ' Export to PDF
    Dim pdfPath As String
    pdfPath = ThisWorkbook.Path & "\" & Me.Controls("txtAgentName").Text & "_BAT_" & _
              Me.Controls("cmbPeriod").Text & "_" & Format(Date, "yyyymmdd") & ".pdf"
    
    summaryWS.ExportAsFixedFormat Type:=xlTypePDF, Filename:=pdfPath, _
                                   Quality:=xlQualityStandard, IncludeDocProps:=True
    
    MsgBox "PDF exported successfully to: " & pdfPath, vbInformation
    
    ' Clean up
    Application.DisplayAlerts = False
    summaryWS.Delete
    Application.DisplayAlerts = True
End Sub

Private Function CreateSummaryWorksheet() As Worksheet
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add
    ws.Name = "BAT_Summary_" & Format(Now, "hhmmss")
    
    ' Create formatted summary matching official BAT layout
    ws.Range("A1").Value = "BEHAVIOURAL ASSESSMENT TOOL (BAT) v2.1 - SUMMARY"
    ws.Range("A1").Font.Size = 16
    ws.Range("A1").Font.Bold = True
    
    ' Agent information
    ws.Range("A3").Value = "Agent Name:"
    ws.Range("B3").Value = Me.Controls("txtAgentName").Text
    ws.Range("A4").Value = "User ID:"
    ws.Range("B4").Value = Me.Controls("txtUserID").Text
    ws.Range("A5").Value = "Assessment Period:"
    ws.Range("B5").Value = Me.Controls("cmbPeriod").Text
    ws.Range("A6").Value = "Assessment Date:"
    ws.Range("B6").Value = Date
    
    ' Summary statistics
    ws.Range("A8").Value = "ASSESSMENT SUMMARY"
    ws.Range("A8").Font.Bold = True
    ws.Range("A9").Value = "Compliance Score:"
    ws.Range("B9").Value = Format(batGrid.ComplianceScore, "0.0") & "%"
    ws.Range("A10").Value = "Completion Rate:"
    ws.Range("B10").Value = Format(batGrid.CompletionRate, "0.0") & "%"
    
    ' Detailed results
    CreateDetailedResults ws, 12
    
    Set CreateSummaryWorksheet = ws
End Function

Private Sub CreateDetailedResults(ws As Worksheet, startRow As Integer)
    ws.Range("A" & startRow).Value = "DETAILED ASSESSMENT RESULTS"
    ws.Range("A" & startRow).Font.Bold = True
    
    Dim r As Integer
    r = startRow + 2
    
    ' Headers
    ws.Range("A" & r).Value = "Question"
    ws.Range("B" & r).Value = "Description"
    ws.Range("C" & r).Value = "Score"
    ws.Range("D" & r).Value = "Category"
    ws.Range("A" & r & ":D" & r).Font.Bold = True
    
    r = r + 1
    
    ' Assessment data
    Dim assessmentData As Collection
    Set assessmentData = batGrid.GetAssessmentData
    
    Dim item As Object
    For Each item In assessmentData
        ws.Cells(r, 1).Value = item("QuestionNumber")
        ws.Cells(r, 2).Value = item("Description")
        ws.Cells(r, 3).Value = item("Score")
        ws.Cells(r, 4).Value = item("Category")
        
        ' Color coding
        Select Case item("Score")
            Case "Yes"
                ws.Cells(r, 3).Interior.Color = RGB(0, 176, 80)
            Case "No"
                ws.Cells(r, 3).Interior.Color = RGB(255, 0, 0)
            Case "Not Demonstrated"
                ws.Cells(r, 3).Interior.Color = RGB(255, 192, 0)
        End Select
        
        r = r + 1
    Next item
    
    ' Auto-fit columns
    ws.Columns("A:D").AutoFit
End Sub

Private Sub UserForm_QueryClose(Cancel As Integer, CloseMode As Integer)
    If isDirty Then
        Dim response As VbMsgBoxResult
        response = MsgBox("You have unsaved changes. Save before closing?", vbYesNoCancel + vbQuestion)
        If response = vbYes Then
            If ValidateRequiredFields() Then
                SaveAssessment
            Else
                Cancel = True
            End If
        ElseIf response = vbCancel Then
            Cancel = True
        End If
    End If
End Sub

' Auto-update when scores change
Private Sub batGrid_OnTileScoreChanged()
    isDirty = True
    UpdateStatusDisplay
End Sub

' --------------------------------------------------------------------------------------
' [5] LAUNCH MODULE
' --------------------------------------------------------------------------------------
Sub LaunchBATAssessment()
    Dim frm As New BATAssessmentForm
    frm.Show
End Sub