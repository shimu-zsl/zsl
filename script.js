document.addEventListener('DOMContentLoaded', function() {
    // 背景幻灯片轮播
    const slides = document.querySelectorAll('.background-slideshow .slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.opacity = '1';
    }
    
    // 每5秒切换一次背景
    setInterval(nextSlide, 5000);
    
    // 页面加载动画
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';
        observer.observe(section);
    });
    
    // 添加可见性类
    document.addEventListener('scroll', function() {
        sections.forEach(section => {
            if (isElementInViewport(section) && !section.classList.contains('visible')) {
                section.classList.add('visible');
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // 技能条动画
    const skillLevels = document.querySelectorAll('.skill-level');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
                // 添加计数器动画
                const skillItem = entry.target.closest('.skill-item');
                const percentage = entry.target.style.width.replace('%', '');
                const counter = document.createElement('span');
                counter.className = 'skill-percentage';
                counter.textContent = '0%';
                
                if (!skillItem.querySelector('.skill-percentage')) {
                    skillItem.appendChild(counter);
                    
                    let count = 0;
                    const interval = setInterval(() => {
                        count++;
                        counter.textContent = count + '%';
                        if (count >= parseInt(percentage)) {
                            clearInterval(interval);
                        }
                    }, 20);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillLevels.forEach(skill => {
        skillObserver.observe(skill);
    });
    
    // 照片悬停3D效果
    const photoFrame = document.querySelector('.photo-frame');
    
    if (photoFrame) {
        photoFrame.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX * 10;
            const deltaY = (y - centerY) / centerY * 10;
            
            this.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg) scale(1.05)`;
            this.style.boxShadow = `${deltaX * 0.5}px ${deltaY * 0.5}px 16px rgba(0, 0, 0, 0.2)`;
        });
        
        photoFrame.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
            this.style.boxShadow = 'none';
            this.style.transition = 'all 0.5s ease-out';
        });
    }
    
    // 时间线项目交互
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const dot = this.querySelector('.timeline-dot');
            const content = this.querySelector('.timeline-content');
            
            dot.style.transform = 'scale(1.5)';
            dot.style.backgroundColor = '#e74c3c';
            content.style.transform = 'translateX(10px)';
            content.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            const dot = this.querySelector('.timeline-dot');
            const content = this.querySelector('.timeline-content');
            
            dot.style.transform = 'scale(1)';
            dot.style.backgroundColor = '';
            content.style.transform = 'translateX(0)';
            content.style.boxShadow = '';
        });
    });
    
    // 奖项卡片交互
    const awardItems = document.querySelectorAll('.award-item');
    
    awardItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.2)';
                icon.style.transition = 'transform 0.6s ease-in-out';
                icon.style.color = '#f1c40f';
            }
            
            // 添加闪光效果
            const shine = document.createElement('div');
            shine.className = 'award-shine';
            shine.style.position = 'absolute';
            shine.style.top = '0';
            shine.style.left = '-100%';
            shine.style.width = '50%';
            shine.style.height = '100%';
            shine.style.background = 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)';
            shine.style.transform = 'skewX(-25deg)';
            shine.style.transition = 'all 0.7s ease';
            
            if (!this.querySelector('.award-shine')) {
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(shine);
                
                setTimeout(() => {
                    shine.style.left = '100%';
                }, 10);
                
                setTimeout(() => {
                    if (this.contains(shine)) {
                        this.removeChild(shine);
                    }
                }, 700);
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            
            if (icon) {
                icon.style.transform = 'rotate(0) scale(1)';
                icon.style.color = '';
            }
        });
    });

    // 展开更多按钮功能
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const expandedContent = this.nextElementSibling;
            expandedContent.classList.toggle('active');
            
            if (expandedContent.classList.contains('active')) {
                this.innerHTML = '收起 <i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = '展开更多 <i class="fas fa-chevron-down"></i>';
            }
        });
    });
    
    // 返回顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 移动端导航菜单
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
        
        // 点击导航链接后关闭菜单
        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }
    
    // 平滑滚动
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 收集表单数据
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // 模拟表单提交
            alert('留言已发送！\n\n姓名: ' + formValues.name + '\n邮箱: ' + formValues.email + '\n主题: ' + formValues.subject + '\n留言: ' + formValues.message);
            
            // 重置表单
            this.reset();
        });
    }
    
    // 打字机效果
    const positionText = document.getElementById('position-text');
    const positions = ['前端开发工程师', '软件工程师', 'UI/UX设计师', '全栈开发工程师'];
    let positionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeEffect() {
        const currentPosition = positions[positionIndex];
        
        if (isDeleting) {
            positionText.textContent = currentPosition.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            positionText.textContent = currentPosition.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentPosition.length) {
            // 完成打字，等待一会儿后开始删除
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            // 完成删除，切换到下一个词
            isDeleting = false;
            positionIndex = (positionIndex + 1) % positions.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    if (positionText) {
        setTimeout(typeEffect, 1000);
    }
    
    // 检查元素是否在视口中
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // 动画元素处理 (AOS替代实现)
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                    element.style.opacity = '1';
                    
                    // 根据动画类型设置不同的效果
                    if (animationType === 'fade-up') {
                        element.style.transform = 'translateY(0)';
                    } else if (animationType === 'fade-right') {
                        element.style.transform = 'translateX(0)';
                    } else if (animationType === 'fade-left') {
                        element.style.transform = 'translateX(0)';
                    } else if (animationType === 'zoom-in') {
                        element.style.transform = 'scale(1)';
                    }
                    
                    observer.unobserve(element);
                }, delay);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        const animationType = element.getAttribute('data-aos');
        element.style.opacity = '0';
        
        // 根据动画类型设置初始状态
        if (animationType === 'fade-up') {
            element.style.transform = 'translateY(30px)';
        } else if (animationType === 'fade-right') {
            element.style.transform = 'translateX(-30px)';
        } else if (animationType === 'fade-left') {
            element.style.transform = 'translateX(30px)';
        } else if (animationType === 'zoom-in') {
            element.style.transform = 'scale(0.9)';
        }
        
        animationObserver.observe(element);
    });
    
    // 添加鼠标跟踪动效
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
    cursor.style.boxShadow = '0 0 15px rgba(52, 152, 219, 0.5)';
    cursor.style.pointerEvents = 'none';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'transform 0.1s, width 0.3s, height 0.3s, background-color 0.3s';
    document.body.appendChild(cursor);
    
    const cursorOuter = document.createElement('div');
    cursorOuter.className = 'custom-cursor-outer';
    cursorOuter.style.position = 'fixed';
    cursorOuter.style.width = '40px';
    cursorOuter.style.height = '40px';
    cursorOuter.style.borderRadius = '50%';
    cursorOuter.style.border = '1px solid rgba(52, 152, 219, 0.5)';
    cursorOuter.style.pointerEvents = 'none';
    cursorOuter.style.transform = 'translate(-50%, -50%)';
    cursorOuter.style.zIndex = '9998';
    cursorOuter.style.transition = 'width 0.3s, height 0.3s, border-color 0.3s';
    document.body.appendChild(cursorOuter);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
        
        // 使外圈延迟跟随
        setTimeout(() => {
            cursorOuter.style.top = e.clientY + 'px';
            cursorOuter.style.left = e.clientX + 'px';
        }, 80);
    });
    
    // 鼠标在可点击元素上的效果
    const clickables = document.querySelectorAll('a, button, input[type="submit"], .award-item, .timeline-item, .photo-frame');
    clickables.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursor.style.backgroundColor = 'rgba(231, 76, 60, 0.5)';
            
            cursorOuter.style.width = '50px';
            cursorOuter.style.height = '50px';
            cursorOuter.style.border = '1px solid rgba(231, 76, 60, 0.7)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
            
            cursorOuter.style.width = '40px';
            cursorOuter.style.height = '40px';
            cursorOuter.style.border = '1px solid rgba(52, 152, 219, 0.5)';
        });
    });
    
    // 鼠标点击效果
    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // 添加打印功能按钮
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> 打印简历';
    printButton.className = 'print-button';
    printButton.style.position = 'fixed';
    printButton.style.bottom = '30px';
    printButton.style.left = '30px';
    printButton.style.padding = '10px 20px';
    printButton.style.backgroundColor = 'var(--primary-color)';
    printButton.style.color = 'white';
    printButton.style.border = 'none';
    printButton.style.borderRadius = '30px';
    printButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    printButton.style.cursor = 'pointer';
    printButton.style.zIndex = '999';
    printButton.style.transition = 'all 0.3s';
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
    
    // 添加暗黑模式切换按钮
    const darkModeButton = document.createElement('button');
    darkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeButton.className = 'dark-mode-button';
    darkModeButton.style.position = 'fixed';
    darkModeButton.style.top = '20px';
    darkModeButton.style.left = '20px';
    darkModeButton.style.width = '45px';
    darkModeButton.style.height = '45px';
    darkModeButton.style.borderRadius = '50%';
    darkModeButton.style.backgroundColor = 'var(--primary-color)';
    darkModeButton.style.color = 'white';
    darkModeButton.style.border = 'none';
    darkModeButton.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
    darkModeButton.style.cursor = 'pointer';
    darkModeButton.style.zIndex = '999';
    darkModeButton.style.transition = 'all 0.3s';
    darkModeButton.style.display = 'flex';
    darkModeButton.style.justifyContent = 'center';
    darkModeButton.style.alignItems = 'center';
    darkModeButton.style.fontSize = '18px';
    
    let isDarkMode = false;
    
    darkModeButton.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.documentElement.style.setProperty('--background-color', '#1a1a1a');
            document.documentElement.style.setProperty('--text-color', '#f8f9fa');
            document.documentElement.style.setProperty('--light-gray', '#333');
            document.body.style.backgroundColor = '#1a1a1a';
            document.querySelectorAll('.container, .timeline-content, .info-item, .cloud-item').forEach(el => {
                el.style.backgroundColor = '#2d2d2d';
                el.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            });
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.style.setProperty('--background-color', '#f8f9fa');
            document.documentElement.style.setProperty('--text-color', '#333');
            document.documentElement.style.setProperty('--light-gray', '#e9ecef');
            document.body.style.backgroundColor = '#f8f9fa';
            document.querySelectorAll('.container, .timeline-content, .info-item, .cloud-item').forEach(el => {
                el.style.backgroundColor = '';
                el.style.boxShadow = '';
            });
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    document.body.appendChild(darkModeButton);
});

// 主题切换功能
function createThemeSwitcher() {
    const themeColors = [
        { primary: '#3498db', secondary: '#2980b9' }, // 蓝色 (默认)
        { primary: '#e74c3c', secondary: '#c0392b' }, // 红色
        { primary: '#2ecc71', secondary: '#27ae60' }, // 绿色
        { primary: '#9b59b6', secondary: '#8e44ad' }, // 紫色
        { primary: '#f39c12', secondary: '#e67e22' }  // 橙色
    ];
    
    // 创建主题切换按钮
    const switcherContainer = document.createElement('div');
    switcherContainer.className = 'theme-switcher';
    switcherContainer.style.position = 'fixed';
    switcherContainer.style.top = '80px';
    switcherContainer.style.right = '20px';
    switcherContainer.style.zIndex = '1000';
    switcherContainer.style.display = 'flex';
    switcherContainer.style.flexDirection = 'column';
    switcherContainer.style.gap = '10px';
    switcherContainer.style.background = 'rgba(255, 255, 255, 0.2)';
    switcherContainer.style.backdropFilter = 'blur(10px)';
    switcherContainer.style.padding = '10px';
    switcherContainer.style.borderRadius = '30px';
    switcherContainer.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    
    themeColors.forEach((theme, index) => {
        const button = document.createElement('button');
        button.style.width = '25px';
        button.style.height = '25px';
        button.style.borderRadius = '50%';
        button.style.border = 'none';
        button.style.backgroundColor = theme.primary;
        button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        button.style.cursor = 'pointer';
        button.style.transition = 'transform 0.3s';
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('click', function() {
            document.documentElement.style.setProperty('--primary-color', theme.primary);
            document.documentElement.style.setProperty('--secondary-color', theme.secondary);
            
            // 添加波纹效果
            const ripple = document.createElement('div');
            ripple.style.position = 'fixed';
            ripple.style.top = '50%';
            ripple.style.left = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = theme.primary;
            ripple.style.opacity = '0.2';
            ripple.style.pointerEvents = 'none';
            ripple.style.transition = 'all 1s ease-out';
            ripple.style.zIndex = '0';
            
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.width = '300vw';
                ripple.style.height = '300vw';
            }, 10);
            
            setTimeout(() => {
                document.body.removeChild(ripple);
            }, 1000);
        });
        
        switcherContainer.appendChild(button);
    });
    
    document.body.appendChild(switcherContainer);
}

// 页面加载完成后创建主题切换器
window.addEventListener('load', createThemeSwitcher); 