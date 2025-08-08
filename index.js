// Smooth scrolling
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Navigation smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Typing effect
        const typingText = document.getElementById('typing-text');
        const texts = [
            'Professional Developer',
            'UI/UX Designer', 
            'Linux Specialist',
            'Full-Stack Engineer'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }

        // Start typing effect
        setTimeout(typeEffect, 1000);

        // Skill bars animation
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    
                    // Animate skill bars when skills section is visible
                    if (entry.target.id === 'skills') {
                        setTimeout(animateSkillBars, 500);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Form submission
        function handleSubmit(event) {
            event.preventDefault();
            
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-gray-900 rounded-2xl p-8 max-w-md mx-4 text-center border border-gray-700">
                    <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-2xl text-white"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                    <p class="text-gray-400 mb-6">Thank you for your message. I'll get back to you soon!</p>
                    <button onclick="this.parentElement.parentElement.remove()" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg smooth-transition hover:shadow-lg text-sm font-medium">
                        Yopish
                    </button>
                </div>
            `;
            
            document.body.appendChild(modal);
            event.target.reset();
        }

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu');
        const mobileNav = document.getElementById('mobile-nav');
        const menuIcon = document.getElementById('menu-icon');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
            
            // Toggle icon between bars and X
            if (mobileNav.classList.contains('hidden')) {
                menuIcon.className = 'fas fa-bars text-xl';
            } else {
                menuIcon.className = 'fas fa-times text-xl';
            }
        });
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('#mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('hidden');
                menuIcon.className = 'fas fa-bars text-xl';
            });
        });

        // Upload Post Modal
        function openUploadModal() {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-white">Yangi Post Qo'shish</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <form class="space-y-4" onsubmit="handlePostUpload(event)">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Post turi</label>
                            <select class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white">
                                <option value="video">Video</option>
                                <option value="image">Rasm</option>
                                <option value="code">Kod</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Sarlavha</label>
                            <input type="text" required class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white" placeholder="Post sarlavhasi">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Tavsif</label>
                            <textarea rows="3" required class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white" placeholder="Post haqida qisqacha..."></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Fayl yuklash</label>
                            <input type="file" accept="video/*,image/*" class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white">
                        </div>
                        <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg smooth-transition hover:shadow-lg text-sm font-medium">
                            <i class="fas fa-upload mr-2"></i> Yuklash
                        </button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // Upload Project Modal
        function openProjectModal() {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-gray-900 rounded-2xl p-8 max-w-lg w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-white">Yangi Loyiha Qo'shish</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <form class="space-y-4" onsubmit="handleProjectUpload(event)">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Loyiha nomi</label>
                            <input type="text" required class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white" placeholder="Loyiha nomi">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Qisqacha tavsif</label>
                            <textarea rows="3" required class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white" placeholder="Loyiha haqida batafsil ma'lumot..."></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Texnologiyalar (vergul bilan ajrating)</label>
                            <input type="text" required class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white" placeholder="React, Node.js, MongoDB">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">GitHub havolasi</label>
                            <input type="url" required class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white" placeholder="https://github.com/username/repo">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Demo havolasi (ixtiyoriy)</label>
                            <input type="url" class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white" placeholder="https://demo-link.com">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Loyiha videosi/rasmi</label>
                            <input type="file" accept="video/*,image/*" class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white">
                        </div>
                        <button type="submit" class="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2.5 rounded-lg smooth-transition hover:shadow-lg text-sm font-medium">
                            <i class="fas fa-plus mr-2"></i> Loyiha Qo'shish
                        </button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // Handle Post Upload
        function handlePostUpload(event) {
            event.preventDefault();
            
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-gray-900 rounded-2xl p-8 max-w-md mx-4 text-center border border-gray-700">
                    <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-2xl text-white"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Post Yuklandi!</h3>
                    <p class="text-gray-400 mb-6">Sizning postingiz muvaffaqiyatli yuklandi va ko'rib chiqilmoqda.</p>
                    <button onclick="this.parentElement.parentElement.remove(); document.querySelector('.fixed').remove();" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg smooth-transition hover:shadow-lg text-sm font-medium">
                        Yopish
                    </button>
                </div>
            `;
            
            document.body.appendChild(modal);
        }

        // Handle Project Upload
        function handleProjectUpload(event) {
            event.preventDefault();
            
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-gray-900 rounded-2xl p-8 max-w-md mx-4 text-center border border-gray-700">
                    <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-2xl text-white"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Loyiha Qo'shildi!</h3>
                    <p class="text-gray-400 mb-6">Yangi loyihangiz muvaffaqiyatli qo'shildi va portfolioda ko'rsatilmoqda.</p>
                    <button onclick="this.parentElement.parentElement.remove(); document.querySelector('.fixed').remove();" class="bg-gradient-to-r from-green-600 to-blue-600 text-white px-5 py-2 rounded-lg smooth-transition hover:shadow-lg text-sm font-medium">
                        Yopish
                    </button>
                </div>
            `;
            
            document.body.appendChild(modal);
        }

        // Blog Modal
        function openBlogModal() {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-gray-900 rounded-2xl p-8 max-w-lg w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-white">Yangi Maqola Yozish</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <form class="space-y-4" onsubmit="handleBlogUpload(event)">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Maqola turi</label>
                            <select class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white">
                                <option value="tutorial">Tutorial</option>
                                <option value="guide">Guide</option>
                                <option value="design">Design</option>
                                <option value="news">Yangiliklar</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Sarlavha</label>
                            <input type="text" required class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white" placeholder="Maqola sarlavhasi">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Qisqacha tavsif</label>
                            <textarea rows="3" required class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white" placeholder="Maqola haqida qisqacha..."></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Teglar (vergul bilan ajrating)</label>
                            <input type="text" required class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white" placeholder="React, JavaScript, Tutorial">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">O'qish vaqti (daqiqa)</label>
                            <input type="number" required class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white" placeholder="5">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Maqola rasmi</label>
                            <input type="file" accept="image/*" class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white">
                        </div>
                        <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg smooth-transition hover:shadow-lg text-sm font-medium">
                            <i class="fas fa-plus mr-2"></i> Maqola Qo'shish
                        </button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // Handle Blog Upload
        function handleBlogUpload(event) {
            event.preventDefault();
            
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-gray-900 rounded-2xl p-8 max-w-md mx-4 text-center border border-gray-700">
                    <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-2xl text-white"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Maqola Qo'shildi!</h3>
                    <p class="text-gray-400 mb-6">Yangi maqolangiz muvaffaqiyatli qo'shildi va blogda ko'rsatilmoqda.</p>
                    <button onclick="this.parentElement.parentElement.remove(); document.querySelector('.fixed').remove();" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg smooth-transition hover:shadow-lg text-sm font-medium">
                        Yopish
                    </button>
                </div>
            `;
            
            document.body.appendChild(modal);
        }

