        function initWebGL() {
            const canvas = document.getElementById("glCanvas");
            const gl = canvas.getContext("webgl");
            
            if (!gl) {
                console.error("WebGL nicht verfügbar");
                canvas.style.display = 'none';
                document.body.style.background = 'linear-gradient(to right, #4b006e, #8a2be2)';
                return;
            }
            
            const vertexShaderSource = `
                attribute vec4 position;
                void main() {
                    gl_Position = position;
                }
            `;
            
            const fragmentShaderSource = `
                precision mediump float;
                uniform float time;
                uniform vec2 resolution;
                const vec3 PURPLE_TONE = vec3(0.8, 0.2, 1.0);
                float rand(vec2 p) {
                    p += .2127 + p.x + .3713 * p.y;
                    vec2 r = 4.789 * sin(789.123 * p);
                    return fract(r.x * r.y);
                }
                float sn(vec2 p) {
                    vec2 i = floor(p - .5);
                    vec2 f = fract(p - .5);
                    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
                    float rt = mix(rand(i), rand(i + vec2(1., 0.)), f.x);
                    float rb = mix(rand(i + vec2(0., 1.)), rand(i + vec2(1., 1.)), f.x);
                    return mix(rt, rb, f.y);
                }
                void main(void) {
                    vec2 uv = gl_FragCoord.xy / resolution.y;
                    vec2 p = uv * vec2(3., 4.3) + time * 0.1;
                    float f = 
                        .5 * sn(p) +
                        .25 * sn(2. * p) +
                        .125 * sn(4. * p) +
                        .0625 * sn(8. * p) +
                        .03125 * sn(16. * p) +
                        .015 * sn(32. * p);
                    vec3 scene = mix(vec3(-0.4, -0.4, -0.15), vec3(1.0, 0.9, 1.3), f);
                    scene *= PURPLE_TONE;
                    gl_FragColor = vec4(scene, 1.0);
                }
            `;
            
            function createShader(gl, type, source) {
                const shader = gl.createShader(type);
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    console.error("Fehler beim Kompilieren des Shaders:", gl.getShaderInfoLog(shader));
                    gl.deleteShader(shader);
                    return null;
                }
                return shader;
            }
            
            const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
            const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
            
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error("Fehler beim Linken des Programms:", gl.getProgramInfoLog(program));
            }
            
            gl.useProgram(program);
            
            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            const positions = [
                -1, -1,
                1, -1,
                -1,  1,
                -1,  1,
                1, -1,
                1,  1,
            ];
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
            
            const positionAttributeLocation = gl.getAttribLocation(program, "position");
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
            
            const timeUniformLocation = gl.getUniformLocation(program, "time");
            const resolutionUniformLocation = gl.getUniformLocation(program, "resolution");
            
            function resizeCanvas() {
                canvas.width = window.innerWidth * window.devicePixelRatio;
                canvas.height = window.innerHeight * window.devicePixelRatio;
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
            }
            
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            
            function render(now) {
                now *= 0.001;
                gl.uniform1f(timeUniformLocation, now);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
                requestAnimationFrame(render);
            }
            
            requestAnimationFrame(render);
        }
        
        function openSection(sectionId) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
            
            history.replaceState(null, null, `#${sectionId}`);
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            initWebGL();
            
            const hash = window.location.hash.substring(1);
            const validSections = ['home', 'maps', 'clients', 'tools', 'collections', 'misc', 'server-templates', 'resource-packs'];
            
            if (hash && validSections.includes(hash)) {
                openSection(hash);
            } else {
                document.getElementById('home').classList.add('active');
            }
            
            const dropdown = document.querySelector('.dropdown-content');
            const downloadsButton = document.querySelector('.dropdown > a');
            if (dropdown && downloadsButton) {
                dropdown.style.width = `${downloadsButton.offsetWidth}px`;
            }
        });
