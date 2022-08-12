// const { defineConfig } = require('vitepress')
import { defineConfig } from 'vitepress'
import { listFiles } from 'list-files-in-dir';

async function makeNavItems(dir: string) {
  const results = (await listFiles('docs/' + dir)).map(el => {
    const split = el.split('/')
    let file = split[split.length - 1].split('.')[0]
    const text = file.charAt(0).toUpperCase() + file.slice(1);
    return { text, link: '/' + dir + '/' + file }
  })
  console.log(results);
  return results
}

async function setupConfig() {

  return defineConfig({
    markdown: { anchor: { permalink: true } },

    title: 'Boid Docs',
    description: 'boid.com',
    lastUpdated: true,
    themeConfig: {
      siteTitle: 'Boid Docs',
      logo: { dark: "/boid-basic.png", light: "/boid-basic-lite.png" },
      nav: [
        { text: 'Home', link: '/' },
        {
          text: 'Boid Links',
          items: [
            { text: 'boid.com', link: 'https://boid.com' },
            { text: 'boid app', link: 'https://app.boid.com' },
            { text: 'powerpools', link: 'https://powerpools.io' },
            { text: 'boid avatars', link: 'https://avatar.boid.com' }
          ]
        }
      ],
      sidebar: [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/introduction' },
            { text: 'Getting Started', link: '/getting-started' },
          ]
        },
        {
          text: 'Tables',
          items: await makeNavItems('tables')
        },
        {
          text: 'Actions',
          items: [
            { text: 'Introduction', link: '/introduction' },
            { text: 'Getting Started', link: '/getting-started' },
          ]
        }
      ]
    },

  })
}

export default setupConfig

