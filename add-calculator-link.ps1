$file = "src\app\tools\page.tsx"
$content = Get-Content $file -Raw

$newSection = @"
      {/* Link to New Calculators */}
      <section className="ws-section bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="ws-container">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg text-center">
            <div className="text-6xl mb-4">🧮</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Try Our New Tax Calculator Suite!
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              6 professional calculators with real-time calculations and Wealthsimple-inspired design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href="/calculators"
                className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all shadow-lg"
              >
                Explore All 6 Calculators →
              </a>
              <a
                href="/mock-return"
                className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
              >
                Practice Tax Filing
              </a>
            </div>
          </div>
        </div>
      </section>

"@

$content = $content -replace '(</section>\s+)(      {/\* Additional Tools \*/})', "`$1$newSection`$2"
Set-Content $file $content
Write-Host "Calculator link added to tools page!"