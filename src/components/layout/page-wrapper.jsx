/**
 * PageWrapper - A reusable wrapper for subpages that provides consistent layout
 * @param {Object} props
 * @param {string} props.title - The page title (h2)
 * @param {React.ComponentType} props.icon - The icon component from lucide-react
 * @param {string} props.subtitle - Optional subtitle/description text
 * @param {React.ReactNode} props.children - The page content
 * @param {string} props.maxWidth - Optional max-width class (default: 'max-w-4xl')
 */
function PageWrapper({ title, icon: Icon, subtitle, children, maxWidth = 'max-w-4xl' }) {
    return (
        <main className="max-w-7xl mx-auto p-4">
            <div className={`${maxWidth} mx-auto`}>
                {(title || Icon || subtitle) && (
                    <div className="mb-8">
                        {title && (
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                {Icon && <Icon className="w-6 h-6 inline-block mr-2" />}
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-gray-600 dark:text-gray-400">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </main>
    )
}

export default PageWrapper

