$file = "src\components\UnifiedNavigation.tsx"
$content = Get-Content $file -Raw

# Add EKBooks website link at the top of Services dropdown
$oldText = @"
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    EKBooks Services
                  </div>
"@

$newText = @"
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    EKBooks Services
                  </div>
                  <a
                    href="http://localhost:3001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-3 text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-colors mx-2 rounded-lg mb-2"
                  >
                    <Briefcase className="w-5 h-5 mr-3" />
                    <div>
                      <div className="font-semibold">Visit EKBooks Website →</div>
                      <div className="text-xs opacity-90">Professional bookkeeping</div>
                    </div>
                  </a>
                  <div className="border-t border-gray-200 my-2"></div>
"@

$content = $content.Replace($oldText, $newText)
Set-Content $file $content
Write-Host "EKBooks website link added to Services dropdown!"