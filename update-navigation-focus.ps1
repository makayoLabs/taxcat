$file = "src\components\UnifiedNavigation.tsx"
$content = Get-Content $file -Raw

# Remove the entire Services dropdown and replace with direct EKBooks link
$oldServicesDropdown = @'
            {/* Services (EKBooks) Dropdown */}
            <div className="relative group">
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg flex items-center ${
                  pathname?.startsWith('/services') || pathname?.startsWith('/team')
                    ? 'text-primary bg-white/10'
                    : 'text-white hover:text-primary hover:bg-white/5'
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
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
                  <Link
                    href="/services"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    <Briefcase className="w-5 h-5 mr-3 text-green-600" />
                    <div>
                      <div className="font-medium">Bookkeeping Services</div>
                      <div className="text-xs text-gray-500">For small businesses</div>
                    </div>
                  </Link>
                  <Link
                    href="/team"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    <div className="w-5 h-5 mr-3 text-green-600 flex items-center justify-center font-bold">👥</div>
                    <div>
                      <div className="font-medium">Our Team</div>
                      <div className="text-xs text-gray-500">Meet the experts</div>
                    </div>
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    <div className="w-5 h-5 mr-3 text-green-600 flex items-center justify-center font-bold">ℹ️</div>
                    <div>
                      <div className="font-medium">About EKBooks</div>
                      <div className="text-xs text-gray-500">Our story</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
'@

$newEKBooksLink = @'
            {/* EKBooks Link */}
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              EKBooks
            </a>
'@

$content = $content.Replace($oldServicesDropdown, $newEKBooksLink)
Set-Content $file $content
Write-Host "Navigation updated - Services dropdown removed, direct EKBooks link added!"