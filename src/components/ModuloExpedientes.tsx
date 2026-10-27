2026-10-27T21:59:20.142837098Z 38 packages are looking for funding
2026-10-27T21:59:20.142884855Z   run `npm fund` for details
2026-10-27T21:59:20.143858019Z 
2026-10-27T21:59:20.143864921Z found 0 vulnerabilities
2026-10-27T21:59:20.670801465Z 
2026-10-27T21:59:20.670818512Z up to date, audited 183 packages in 425ms
2026-10-27T21:59:20.670824834Z 
2026-10-27T21:59:20.670897979Z 38 packages are looking for funding
2026-10-27T21:59:20.670949479Z   run `npm fund` for details
2026-10-27T21:59:20.67185946Z 
2026-10-27T21:59:20.671863957Z found 0 vulnerabilities
2026-10-27T21:59:20.727449618Z ==> Running build command 'npm install --legacy-peer-deps && npx vite build'...
2026-10-27T21:59:21.214581018Z 
2026-10-27T21:59:21.214601289Z up to date, audited 183 packages in 414ms
2026-10-27T21:59:21.214609057Z 
2026-10-27T21:59:21.214679845Z 38 packages are looking for funding
2026-10-27T21:59:21.214737011Z   run `npm fund` for details
2026-10-27T21:59:21.215627793Z 
2026-10-27T21:59:21.215634944Z found 0 vulnerabilities
2026-10-27T21:59:21.693822834Z (!) Your Vite config uses features that are unsupported by `configLoader: 'native'`, which is planned to become the default in a future major version of Vite:
2026-10-27T21:59:21.693839314Z   - `__dirname` (vite.config.ts:11:27). Use `import.meta.dirname` instead
2026-10-27T21:59:21.693840874Z Set `VITE_CONFIG_NATIVE_IGNORE_WARNING=true` to suppress this warning.
2026-10-27T21:59:21.707686019Z vite v8.3.5 building client environment for production...
2026-10-27T21:59:21.717701945Z transforming...
2026-10-27T21:59:22.069865659Z ✓ 1661 modules transformed.
2026-10-27T21:59:22.072832673Z ✗ Build failed in 364ms
2026-10-27T21:59:22.073182596Z error during build:
2026-10-27T21:59:22.07318652Z Build failed with 1 error:
2026-10-27T21:59:22.073188171Z 
2026-10-27T21:59:22.073190097Z [builtin:vite-transform] Expected a semicolon or an implicit semicolon after a statement, but found none
2026-10-27T21:59:22.073192127Z     ╭─[ src/components/ModuloExpedientes.tsx:87:68 ]
2026-10-27T21:59:22.073194127Z     │
2026-10-27T21:59:22.073196451Z  87 │   const [archivoComprobante, setArchivoComprobante] = useState<File null |>(null);
2026-10-27T21:59:22.073210722Z     │                                                                    │ 
2026-10-27T21:59:22.073212736Z     │                                                                    ╰─ 
2026-10-27T21:59:22.073214015Z     │ 
2026-10-27T21:59:22.073215738Z     │ Help: Try inserting a semicolon here
2026-10-27T21:59:22.073217067Z ────╯
2026-10-27T21:59:22.073218209Z 
2026-10-27T21:59:22.073220386Z     at aggregateBindingErrorsIntoJsError (file:///opt/render/project/src/node_modules/rolldown/dist/shared/error-D0SD8_tL.mjs:49:18)
2026-10-27T21:59:22.073235514Z     at unwrapBindingResult (file:///opt/render/project/src/node_modules/rolldown/dist/shared/error-D0SD8_tL.mjs:19:128)
2026-10-27T21:59:22.073239613Z     at #build (file:///opt/render/project/src/node_modules/rolldown/dist/shared/rolldown-CMhwwZPA.mjs:145:34)
2026-10-27T21:59:22.07324108Z     at async buildEnvironment (file:///opt/render/project/src/node_modules/vite/dist/node/chunks/node.js:34849:66)
2026-10-27T21:59:22.073242444Z     at async Object.build (file:///opt/render/project/src/node_modules/vite/dist/node/chunks/node.js:35270:19)
2026-10-27T21:59:22.073243928Z     at async Object.buildApp (file:///opt/render/project/src/node_modules/vite/dist/node/chunks/node.js:35267:153)
2026-10-27T21:59:22.073245405Z     at async CAC.<anonymous> (file:///opt/render/project/src/node_modules/vite/dist/node/cli.js:790:3) {
2026-10-27T21:59:22.073246749Z   errors: [Getter/Setter]
2026-10-27T21:59:22.073248116Z }
2026-10-27T21:59:22.120551798Z ==> Build failed 😞
2026-10-27T21:59:22.12056667Z ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
