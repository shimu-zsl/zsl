document.addEventListener('DOMContentLoaded', function() {
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
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillLevels.forEach(skill => {
        skillObserver.observe(skill);
    });
    
    // 照片悬停效果
    const photoFrame = document.querySelector('.photo-frame');
    
    if (photoFrame) {
        photoFrame.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        });
        
        photoFrame.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
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
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.6s ease-in-out';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            
            if (icon) {
                icon.style.transform = 'rotate(0)';
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
    switcherContainer.style.top = '20px';
    switcherContainer.style.right = '20px';
    switcherContainer.style.zIndex = '1000';
    switcherContainer.style.display = 'flex';
    switcherContainer.style.flexDirection = 'column';
    switcherContainer.style.gap = '10px';
    
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
        });
        
        switcherContainer.appendChild(button);
    });
    
    document.body.appendChild(switcherContainer);
}

// 页面加载完成后创建主题切换器
window.addEventListener('load', createThemeSwitcher); 