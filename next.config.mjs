/** @type {import('next').NextConfig} */
async function getNextConfig() {
  let userConfig = {}
  try {
    userConfig = await import('./interns-ship-user-next.config.mjs')
  } catch (e) {
    // ignore error if file doesn't exist
  }

  const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      unoptimized: true,
      domains: ['raw.githubusercontent.com'], // Allow external images
    },
    experimental: {
      webpackBuildWorker: true,
      parallelServerBuildTraces: true,
      parallelServerCompiles: true,
    },
  }

  mergeConfig(nextConfig, userConfig)
  return nextConfig
}

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (typeof nextConfig[key] === 'object' && !Array.isArray(nextConfig[key])) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default getNextConfig()
