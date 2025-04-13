export const commandResponses = {
  "--help": `Available commands:
  --help         Show this help
  bio            Show your biography
  stack          Show tech stack
  projects       Show your projects
  experience     Show companies you've worked at
  clear          Clear the terminal
  `,

  bio: `Hi, I'm Mikulas Tros, a senior software engineer based in Czechia with a focus on scalable, secure software. I'm passionate about building great products and I love to learn new things. I'm highly skilled in PHP and Laravel, so you can count on me to deliver quality code.
  
I'm used to designing and building scalable, secure, and performant applications. I'm also experienced in building and maintaining large-scale distributed systems.

LinkedIn: <a href="https://www.linkedin.com/in/mikulas-tros/" target="_blank">Mikulas Tros</a>  
Contact: <a>mikulas.tros@seznam.cz</a>
  `,

  stack: `Tech Stack:
  - PHP, Laravel
  - JavaScript / TypeScript
  - React, Vue 3, TailwindCSS
  - Node.js
  - PostgreSQL, MySQL, MongoDB, Redis
  - Docker, Kubernetes
  - PestPHP, PHPUnit, Playwright
  - Git, GitHub
  `,

  projects: `Projects:
  - <a href="https://penterep.com" target="_blank">Penterep</a>: Comprehensive platform for penetration testing.
  - <a href="https://www.smarthealth.works" target="_blank">Smart Health</a>: The platform for lifestyle improvement and wellbeing.
  - <a href="https://lgproradost.cz/cs" target="_blank">LG Pro Radost</a>: LG Promo actions in Czechia.
  - <a href="https://editee.com" target="_blank">Editee</a>: The #1 AI platform in Czechia.
  - <a>WeDo/Geis</a>: Logistics system managing transport, tracking, and billing. 
  `,

  experience: `Experience:
  - <a href="https://penterep.com" target="_blank">Penterep</a>: Full-stack developer and architect (Oct 2023–Now)
  - <a href="https://www.qbixx.nl" target="_blank">Qbixx</a>: Full-stack developer (Jun 2022–Nov 2023)
  - <a href="https://www.logtech.cz" target="_blank">LogTech s.r.o.</a>: Full-stack developer (Jun 2021– Apr 2022)
  - <a>Freelancer</a>: Worked in many more companies and projects in the past 7 years. Check <a href="https://linkedin.com/in/mikulas-tros/" target="_blank">LinkedIn</a> for more.
  `,

  socials: `Socials:
  - <a href="https://github.com/Majkie" target="_blank">GitHub</a>
  - <a href="https://linkedin.com/in/mikulas-tros/" target="_blank">LinkedIn</a>
  - <a href="https://x.com/majciik1" target="_blank">X</a>
  `,
} as const;

export const commandList = Object.keys(commandResponses).concat("clear");
