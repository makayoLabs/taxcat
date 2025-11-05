' ======================================================================================
' FULL VBA IMPLEMENTATION: BAT + QMS GRID DASHBOARD IN EXCEL (COMPLETE SYSTEM + DEPLOYMENT)
' ======================================================================================

' --------------------------------------------------------------------------------------
' [1] CLASS MODULE: CriteriaItem
' --------------------------------------------------------------------------------------
Public Label As String
Public Description As String

Public Sub Init(lbl As String, desc As String)
    Me.Label = lbl
    Me.Description = desc
End Sub

' --------------------------------------------------------------------------------------
' [2] CLASS MODULE: GridTile
' --------------------------------------------------------------------------------------
Public WithEvents Tile As MSForms.Label
Private currentScore As Integer

Public Property Get GetScore() As Integer
    GetScore = currentScore
End Property

Private Sub Tile_Click()
    currentScore = (currentScore Mod 5) + 1
    UpdateColor
End Sub

Private Sub Tile_MouseMove(ByVal Button As Integer, ByVal Shift As Integer, ByVal X As Single, ByVal Y As Single)
    Tile.ControlTipText = Tile.Tag
End Sub

Private Sub UpdateColor()
    Select Case currentScore
        Case 5: Tile.BackColor = RGB(0, 176, 80)
        Case 4: Tile.BackColor = RGB(146, 208, 80)
        Case 3: Tile.BackColor = RGB(255, 255, 0)
        Case 2: Tile.BackColor = RGB(255, 192, 0)
        Case 1: Tile.BackColor = RGB(255, 0, 0)
    End Select
    Tile.Caption = currentScore
End Sub

Public Sub InitializeTile(ByRef parentForm As Object, ByRef item As CriteriaItem, topVal As Single, leftVal As Single)
    Set Tile = parentForm.Controls.Add("Forms.Label.1")
    With Tile
        .Caption = "-"
        .Width = 30
        .Height = 30
        .BackStyle = fmBackStyleOpaque
        .SpecialEffect = fmSpecialEffectRaised
        .TextAlign = fmTextAlignCenter
        .Top = topVal
        .Left = leftVal
        .Tag = item.Description
        .Name = Replace(item.Label, ".", "_")
    End With
End Sub

' --------------------------------------------------------------------------------------
' [3] CLASS MODULE: GridBox
' --------------------------------------------------------------------------------------
Private tiles() As GridTile

Public Sub CreateGrid(ByRef parentForm As Object, items As Collection, topOffset As Single, leftOffset As Single)
    Dim i As Integer
    ReDim tiles(1 To items.Count)
    For i = 1 To items.Count
        Set tiles(i) = New GridTile
        tiles(i).InitializeTile parentForm, items(i), _
            topOffset + ((i - 1) \ 5) * 35, leftOffset + ((i - 1) Mod 5) * 35
    Next i
End Sub

' --------------------------------------------------------------------------------------
' [4] USERFORM: GridForm (with Framework Table)
' --------------------------------------------------------------------------------------
Private batBox As GridBox
Private qmsBox As GridBox

Private Sub UserForm_Initialize()
    LoadBATQMS
    LoadFrameworkTable
End Sub

Private Sub LoadBATQMS()
    Dim BAT As Collection, QMS As Collection
    Set BAT = New Collection
    Set QMS = New Collection

    ' [BAT items as before]
    BAT.Add CreateItem("1.1", "Completes time reporting accurately and timely")
    BAT.Add CreateItem("1.2", "Arrives on time and reports absences properly")
    BAT.Add CreateItem("1.3", "Seeks approval before going offline or for leave")
    BAT.Add CreateItem("2.1", "Is open to feedback and coaching")
    BAT.Add CreateItem("2.2", "Demonstrates understanding of feedback")
    BAT.Add CreateItem("2.3", "Engages in follow-up action plans")
    BAT.Add CreateItem("2.4", "Participates in self-assessment and reflection")
    BAT.Add CreateItem("3.1", "Supports colleagues and contributes to team goals")
    BAT.Add CreateItem("3.2", "Shares knowledge and best practices")
    BAT.Add CreateItem("3.3", "Demonstrates flexibility to help others")
    BAT.Add CreateItem("4.1", "Is respectful in interactions with clients and peers")
    BAT.Add CreateItem("4.2", "Demonstrates inclusive and professional behavior")
    BAT.Add CreateItem("5.1", "Looks for ways to improve processes")
    BAT.Add CreateItem("5.2", "Participates in improvement initiatives")
    BAT.Add CreateItem("5.3", "Provides suggestions for efficiency")
    BAT.Add CreateItem("5.4", "Demonstrates innovation in task execution")
    BAT.Add CreateItem("5.5", "Applies lessons learned proactively")

    ' [QMS items as before]
    QMS.Add CreateItem("Account Security", "Follows secure handling of account information")
    QMS.Add CreateItem("Listening", "Listens without interrupting, demonstrates understanding")
    QMS.Add CreateItem("Responsiveness", "Responds promptly and does not delay unnecessarily")
    QMS.Add CreateItem("Accuracy", "Gives complete, correct information")
    QMS.Add CreateItem("Professionalism", "Maintains professional language and behavior")
    QMS.Add CreateItem("Tone", "Uses respectful, calm, and appropriate tone")
    QMS.Add CreateItem("Ownership", "Takes accountability for resolving issues")
    QMS.Add CreateItem("Clarity", "Communicates clearly and avoids jargon")
    QMS.Add CreateItem("Efficiency", "Manages time effectively during the interaction")
    QMS.Add CreateItem("Probing", "Asks relevant questions to understand caller needs")
    QMS.Add CreateItem("Recap", "Restates key points and confirms accuracy")
    QMS.Add CreateItem("Closure", "Closes call with proper summary and thanks")
    QMS.Add CreateItem("Empathy", "Acknowledges and validates caller’s concerns")
    QMS.Add CreateItem("Greeting", "Uses correct opening greeting")
    QMS.Add CreateItem("Confidentiality", "Ensures private conversation")

    Set batBox = New GridBox
    Set qmsBox = New GridBox
    batBox.CreateGrid Me.MultiPageBATQMS.Pages(0), BAT, 20, 20
    qmsBox.CreateGrid Me.MultiPageBATQMS.Pages(1), QMS, 20, 20
End Sub
End Sub

Private Function CreateItem(lbl As String, desc As String) As CriteriaItem
    Dim item As New CriteriaItem
    item.Init lbl, desc
    Set CreateItem = item
End Function

Private Sub cmdSave_Click()
    Dim ws As Worksheet, r As Long, ctrl As Control
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets("PerformanceLog")
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add(After:=Sheets(Sheets.Count))
        ws.Name = "PerformanceLog"
        ws.Range("A1:D1").Value = Array("Date", "Category", "Label", "Score")
    End If
    On Error GoTo 0
    r = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row + 1
    For Each ctrl In Me.MultiPageBATQMS.Pages(0).Controls
        If TypeName(ctrl) = "Label" And IsNumeric(ctrl.Caption) Then
            ws.Cells(r, 1).Value = Date
            ws.Cells(r, 2).Value = "BAT"
            ws.Cells(r, 3).Value = ctrl.Name
            ws.Cells(r, 4).Value = ctrl.Caption
            r = r + 1
        End If
    Next ctrl
    For Each ctrl In Me.MultiPageBATQMS.Pages(1).Controls
        If TypeName(ctrl) = "Label" And IsNumeric(ctrl.Caption) Then
            ws.Cells(r, 1).Value = Date
            ws.Cells(r, 2).Value = "QMS"
            ws.Cells(r, 3).Value = ctrl.Name
            ws.Cells(r, 4).Value = ctrl.Caption
            r = r + 1
        End If
    Next ctrl
    MsgBox "Scores saved.", vbInformation
End Sub

Private Sub cmdSummary_Click()
    Dim logWS As Worksheet, dashWS As Worksheet
    On Error Resume Next
    Set logWS = ThisWorkbook.Sheets("PerformanceLog")
    If logWS Is Nothing Then MsgBox "No log found.": Exit Sub
    Set dashWS = ThisWorkbook.Sheets("PerformanceDashboard")
    If dashWS Is Nothing Then Set dashWS = Sheets.Add(After:=Sheets(Sheets.Count))
    dashWS.Name = "PerformanceDashboard"
    dashWS.Cells.Clear
    On Error GoTo 0
    dashWS.Range("A1:D1").Value = Array("Label", "Avg", "Min", "Max")

    Dim dict As Object: Set dict = CreateObject("Scripting.Dictionary")
    Dim i As Long, lastRow As Long, k, v, label, score
    lastRow = logWS.Cells(logWS.Rows.Count, 1).End(xlUp).Row
    For i = 2 To lastRow
        label = logWS.Cells(i, 3).Value
        score = logWS.Cells(i, 4).Value
        If Not dict.exists(label) Then
            dict.Add label, Array(score, score, score, 1)
        Else
            v = dict(label)
            v(0) = v(0) + score
            v(1) = Application.Min(v(1), score)
            v(2) = Application.Max(v(2), score)
            v(3) = v(3) + 1
            dict(label) = v
        End If
    Next i
    i = 2
    For Each k In dict.Keys
        v = dict(k)
        dashWS.Cells(i, 1).Value = k
        dashWS.Cells(i, 2).Value = Round(v(0) / v(3), 2)
        dashWS.Cells(i, 3).Value = v(1)
        dashWS.Cells(i, 4).Value = v(2)
        i = i + 1
    Next k

    ' Chart
    Dim chartObj As ChartObject
    Set chartObj = dashWS.ChartObjects.Add(Left:=300, Width:=500, Top:=10, Height:=250)
    With chartObj.Chart
        .SetSourceData Source:=dashWS.Range("A1:D" & i - 1)
        .ChartType = xlColumnClustered
        .HasTitle = True
        .ChartTitle.Text = "Average Score per Label"
    End With

    ' Flag low scores
    Dim checkRange As Range
    Set checkRange = dashWS.Range("B2:B" & i - 1)
    For Each cell In checkRange
        If cell.Value < 3 Then
            cell.Interior.Color = RGB(255, 200, 200)
            cell.Offset(0, -1).Interior.Color = RGB(255, 200, 200)
        End If
    Next cell

    MsgBox "Dashboard updated.", vbInformation
End Sub

' --------------------------------------------------------------------------------------
' [5] EXPORT TO PDF
' --------------------------------------------------------------------------------------
Public Sub ExportDashboardToPDF()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("PerformanceDashboard")
    Dim pdfName As String
    pdfName = ThisWorkbook.Path & "\Dashboard_" & Format(Now, "yyyymmdd_hhmmss") & ".pdf"
    ws.ExportAsFixedFormat Type:=xlTypePDF, Filename:=pdfName
    MsgBox "Exported: " & pdfName
End Sub

' --------------------------------------------------------------------------------------
' [6] EMAIL WITH OUTLOOK
' --------------------------------------------------------------------------------------
Public Sub EmailDashboard()
    Dim ws As Worksheet, pdfPath As String
    Set ws = ThisWorkbook.Sheets("PerformanceDashboard")
    pdfPath = Environ("TEMP") & "\DashboardReport.pdf"
    ws.ExportAsFixedFormat Type:=xlTypePDF, Filename:=pdfPath
    Dim OutlookApp As Object, MailItem As Object
    Set OutlookApp = CreateObject("Outlook.Application")
    Set MailItem = OutlookApp.CreateItem(0)
    With MailItem
        .To = ""
        .Subject = "Performance Dashboard"
        .Body = "Attached: Performance report."
        .Attachments.Add pdfPath
        .Display
    End With
End Sub

' --------------------------------------------------------------------------------------
' [6] FRAMEWORK TABLE (UserForm Table with Checklist)
' --------------------------------------------------------------------------------------
Private Sub LoadFrameworkTable()
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets("Framework")
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add(Before:=Sheets(1))
        ws.Name = "Framework"
    Else
        ws.Cells.Clear
    End If
    On Error GoTo 0

    ws.Range("A1:F1").Value = Array("Step #", "Step Name", "QMS Ref", "BAT Ref", "Description / Script", "Completed")
    Dim data
    data = Array( _
        Array(0, "BEFORE THE CALL", "", "BAT 1.1, 1.2", "Prepare your tools. Mentally focus. Log time accurately."), _
        Array(1, "Start the Call", "QMS #1", "", "Use the proper greeting script."), _
        Array(2, "Determine Enquiry", "QMS #2", "", "Clarify account-specific or general."), _
        Array(3, "Verify Identity", "QMS #3", "", "Apply confidentiality. Never reveal before verification."), _
        Array(4, "Understand Enquiry", "QMS #4", "BAT 2.2, 4.1, 4.2", "Probe, paraphrase, active listening."), _
        Array(5, "Respond Clearly", "QMS #5, QMS #13", "BAT 2.1, 5.1", "Accurate, plain-language response."), _
        Array(6, "Take Action", "QMS #6", "", "Perform correct updates. Avoid errors."), _
        Array(7, "Record Notes", "QMS #7", "", "Write clear, factual diary notes."), _
        Array(8, "Offer Reference", "QMS #12", "", "Offer ELMS/email reference."), _
        Array(9, "Call Control & Empathy", "QMS #13, #14", "BAT 3.1, 3.2", "Stay calm. Adjust tone. Acknowledge concerns."), _
        Array(10, "Hold & Transfers", "QMS #9, #10", "", "Ask permission. Explain reason."), _
        Array(11, "Close the Call", "QMS #8", "", "Confirm resolution. Thank caller."), _
        Array(12, "AFTER THE CALL", "QMS #15", "BAT 1.4, 1.5, 5.1", "Submit forms. Follow up. Apply feedback.") _
    )

    Dim i As Long
    For i = 0 To UBound(data)
        ws.Range("A" & i + 2).Resize(1, 5).Value = data(i)
        ws.Cells(i + 2, 6).Value = False
    Next i

    ws.Columns("A:F").AutoFit
    ws.Protect Password:="framework", UserInterfaceOnly:=True
    AddFrameworkToggleHandler ws
    AddFrameworkCompletionSummary ws
End Sub

' --------------------------------------------------------------------------------------
' [6a] ADD % COMPLETE SUMMARY TO FRAMEWORK
' --------------------------------------------------------------------------------------
Private Sub AddFrameworkCompletionSummary(ws As Worksheet)
    Dim lastRow As Long, completeCount As Long, percentComplete As Double
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    completeCount = Application.WorksheetFunction.CountIf(ws.Range("F2:F" & lastRow), True)
    If lastRow > 1 Then
        percentComplete = completeCount / (lastRow - 1)
        ws.Range("H1").Value = "% Complete"
        ws.Range("H2").Value = Format(percentComplete, "0.0%")
        ws.Range("H1:H2").Font.Bold = True
    End If
End Sub

' --------------------------------------------------------------------------------------
' [6b] TOGGLE TRUE/FALSE ON CLICK IN FRAMEWORK SHEET
' --------------------------------------------------------------------------------------
Private Sub AddFrameworkToggleHandler(ws As Worksheet)
    Dim code As String
    code = "Private Sub Worksheet_SelectionChange(ByVal Target As Range)" & vbCrLf & _
           "    If Target.Column = 6 And Target.Row > 1 Then" & vbCrLf & _
           "        Application.EnableEvents = False" & vbCrLf & _
           "        If Target.Value = True Then" & vbCrLf & _
           "            Target.Value = False" & vbCrLf & _
           "        Else" & vbCrLf & _
           "            Target.Value = True" & vbCrLf & _
           "        End If" & vbCrLf & _
           "        Application.EnableEvents = True" & vbCrLf & _
           "    End If" & vbCrLf & _
           "End Sub"

    With ThisWorkbook.VBProject.VBComponents(ws.CodeName).CodeModule
        .DeleteLines 1, .CountOfLines
        .InsertLines 1, code
    End With
End Sub

' --------------------------------------------------------------------------------------
' [7] ADHERENCE LOGGER MODULE
' --------------------------------------------------------------------------------------
Public Sub ShowAdherenceForm()
    frmAdherenceTracker.Show
End Sub

Public Sub ExportAdherenceEmailTemplate()
    Dim msg As String, r As Long, ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Adherence_Log")
    msg = "Hello,%0D%0A%0D%0APlease find my adherence report for " & Format(Date, "MMMM DD") & ":%0D%0A%0D%0A"
    msg = msg & "Shift: 9:00 AM – 5:00 PM%0D%0AOff-phone Time Logged:%0D%0A"
    For r = 2 To ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
        If ws.Cells(r, 1).Value = Date Then
            msg = msg & "- " & ws.Cells(r, 2).Value & ": " & _
                Format(ws.Cells(r, 3).Value, "hh:mm") & " – " & Format(ws.Cells(r, 4).Value, "hh:mm")
            If ws.Cells(r, 6).Value <> "" Then msg = msg & " (" & ws.Cells(r, 6).Value & ")"
            msg = msg & "%0D%0A"
        End If
    Next r
    msg = msg & "%0D%0AReason for discrepancy:%0D%0A[Enter here]%0D%0A%0D%0AThanks,%0D%0A[Your Name]"
    ThisWorkbook.FollowHyperlink "mailto:?subject=Adherence Adjustment Request&body=" & msg
End Sub

' --------------------------------------------------------------------------------------
' [8] USERFORM: frmAdherenceTracker
' --------------------------------------------------------------------------------------
Private StartTime As Date, EndTime As Date

Private Sub UserForm_Initialize()
    With cboStateType
        .Clear
        .AddItem "Break"
        .AddItem "Lunch"
        .AddItem "Coaching"
        .AddItem "Meeting"
        .AddItem "System Issue"
        .AddItem "Offline"
        .AddItem "Bio"
    End With
    LoadTodayEntries
End Sub

Private Sub btnStart_Click()
    StartTime = Now
    MsgBox "Start time: " & Format(StartTime, "hh:mm:ss AM/PM")
End Sub

Private Sub btnEnd_Click()
    EndTime = Now
    MsgBox "End time: " & Format(EndTime, "hh:mm:ss AM/PM")
End Sub

Private Sub btnLog_Click()
    If cboStateType.Value = "" Or StartTime = 0 Or EndTime = 0 Then
        MsgBox "Fill all required fields."
        Exit Sub
    End If
    With ThisWorkbook.Sheets("Adherence_Log")
        Dim r As Long: r = .Cells(.Rows.Count, 1).End(xlUp).Row + 1
        .Cells(r, 1).Value = Date
        .Cells(r, 2).Value = cboStateType.Value
        .Cells(r, 3).Value = StartTime
        .Cells(r, 4).Value = EndTime
        .Cells(r, 5).Formula = "=D" & r & "-C" & r
        .Cells(r, 6).Value = txtNotes.Value
    End With
    MsgBox "Entry logged."
    LoadTodayEntries
End Sub

Private Sub LoadTodayEntries()
    Dim ws As Worksheet: Set ws = ThisWorkbook.Sheets("Adherence_Log")
    Dim i As Long: lstLog.Clear
    For i = 2 To ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
        If ws.Cells(i, 1).Value = Date Then
            lstLog.AddItem ws.Cells(i, 2).Value & " | " & _
                Format(ws.Cells(i, 3).Value, "hh:mm") & "-" & _
                Format(ws.Cells(i, 4).Value, "hh:mm") & " | " & ws.Cells(i, 6).Value
        End If
    Next i
End Sub

Private Sub btnClose_Click()
    Unload Me
End Sub

' --------------------------------------------------------------------------------------
' [9] WORKBOOK AUTO-LAUNCH
' --------------------------------------------------------------------------------------
Private Sub Workbook_Open()
    GridForm.Show
End Sub

' --------------------------------------------------------------------------------------
' [8] DEPLOYMENT + README
' --------------------------------------------------------------------------------------
' See deployment notes in previous section
