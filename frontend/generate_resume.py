import os
try:
    from reportlab.lib.pagesizes import letter
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.lib import colors
except ImportError:
    print("reportlab is not installed")
    exit(1)

def create_resume(output_path):
    doc = SimpleDocTemplate(output_path, pagesize=letter,
                            rightMargin=40, leftMargin=40,
                            topMargin=40, bottomMargin=40)
    
    styles = getSampleStyleSheet()
    
    # Custom Styles
    name_style = ParagraphStyle('Name', parent=styles['Heading1'], fontSize=16, spaceAfter=6, alignment=1) # Center aligned
    contact_style = ParagraphStyle('Contact', parent=styles['Normal'], fontSize=10, spaceAfter=12, alignment=1)
    
    section_heading = ParagraphStyle('SectionHeading', parent=styles['Heading2'], fontSize=12, spaceBefore=12, spaceAfter=6, textColor=colors.HexColor('#2c3e50'))
    
    job_title_style = ParagraphStyle('JobTitle', parent=styles['Heading3'], fontSize=11, spaceBefore=6, spaceAfter=2)
    job_meta_style = ParagraphStyle('JobMeta', parent=styles['Normal'], fontSize=10, textColor=colors.gray, spaceAfter=6)
    
    body_text_style = ParagraphStyle('BodyText', parent=styles['Normal'], fontSize=10, spaceAfter=4, leading=14)
    bullet_style = ParagraphStyle('BulletText', parent=styles['Normal'], fontSize=10, spaceAfter=3, leading=14, leftIndent=15, firstLineIndent=-10)
    project_title_style = ParagraphStyle('ProjectTitle', parent=styles['Normal'], fontSize=10, spaceBefore=4, spaceAfter=2)

    Story = []

    # Header
    Story.append(Paragraph("<b>ITIKYALA MULINTI VISHNUVARDHAN REDDY</b>", name_style))
    Story.append(Paragraph("Kurnool, India | 7093262941 | i.m.vishnuvardhan2002@gmail.com | LinkedIn Profile", contact_style))
    Story.append(HRFlowable(width="100%", thickness=1, color=colors.lightgrey, spaceAfter=12))

    # Professional Summary
    Story.append(Paragraph("<b>PROFESSIONAL SUMMARY</b>", section_heading))
    summary_text = ("Full-stack Web Developer and Computer Science graduate with a proven track record of "
                    "engineering high-traffic Django applications and professional corporate sites. Combines "
                    "hands-on experience in real-time supply chain operations at Amazon with technical "
                    "expertise in Python, SQL, and JavaScript to deliver scalable, data-driven solutions. Skilled in "
                    "process automation and performance optimization, seeking to leverage problem-solving abilities "
                    "in a dynamic IT or Data Analytics environment.")
    Story.append(Paragraph(summary_text, body_text_style))

    # Skills
    Story.append(Paragraph("<b>SKILLS</b>", section_heading))
    Story.append(Paragraph("<b>Programming:</b> PYTHON, SQL, HTML, CSS, JavaScript", body_text_style))
    Story.append(Paragraph("<b>Tools:</b> Data Analytics, Excel", body_text_style))
    Story.append(Paragraph("<b>Soft Skills:</b> Communication", body_text_style))
    Story.append(Paragraph("<b>Languages:</b> English, Telugu, Hindi, Kannada", body_text_style))

    # Work Experience
    Story.append(Paragraph("<b>WORK EXPERIENCE</b>", section_heading))

    # Job 1
    Story.append(Paragraph("<b>Associate IT Engineer (Web Developer)</b> - Priyansh Technologies | Hyderabad, India", job_title_style))
    Story.append(Paragraph("<i>12/2025 – Present</i>", job_meta_style))
    Story.append(Paragraph("An IT services and software firm delivering end-to-end digital solutions, cloud integration, and scalable web architectures across various industries.", body_text_style))
    Story.append(Paragraph("&bull; <b>ShopSphere (Multi-Vendor E-commerce Web Application):</b> Engineered a high-traffic Django marketplace. Integrated REST APIs for real-time inventory and built robust cart/auth systems for hundreds of vendors.", bullet_style))
    Story.append(Paragraph("&bull; <b>SmartXML Solutions Website:</b> Designed and implemented the front-end architecture for the SmartXML corporate site, focusing on high-performance rendering and SEO friendly structures. Automated data processing workflows by building custom scripts to handle XML-to-web data mapping.", bullet_style))
    Story.append(Paragraph("&bull; <b>HPE IT Solutions Website:</b> Built and deployed a professional service-oriented website using HTML5, CSS3, and JavaScript, ensuring 100% mobile responsiveness and cross-browser compatibility.", bullet_style))

    Story.append(Spacer(1, 6))

    # Job 2
    Story.append(Paragraph("<b>ROC Specialist</b> - Amazon | Hyderabad, India", job_title_style))
    Story.append(Paragraph("<i>08/2024 – 12/2025</i>", job_meta_style))
    Story.append(Paragraph("Supply chain and logistics professional at Amazon ROC, specializing in transportation operations, process improvement, and data-driven decision-making.", body_text_style))
    Story.append(Paragraph("&bull; Monitored real-time supply chain operations, analysed transportation data, and resolved escalations to improve on-time delivery.", bullet_style))
    Story.append(Paragraph("&bull; Utilized dashboards to track KPIs (AHT, SLA, TAT) and implemented process improvements that reduced downtime and boosted productivity.", bullet_style))
    Story.append(Paragraph("&bull; Recognized for problem-solving skills, accuracy, and efficiency. Optimized workforce allocation and prepared leadership reports.", bullet_style))
    Story.append(Paragraph("&bull; <b>Project 1:</b> After-Hours Logistics Optimization: Spearheaded a pilot project to manage and execute logistics runs in the European region.", bullet_style))
    Story.append(Paragraph("&bull; <b>Project 2:</b> Empty Mile Reduction Strategy: Currently developing a new project focused on minimizing 'empty miles' to improve operational efficiency.", bullet_style))

    # Education
    Story.append(Paragraph("<b>EDUCATION</b>", section_heading))
    Story.append(Paragraph("<b>Bachelors of Technology - Computer Science and Engineering</b>", project_title_style))
    Story.append(Paragraph("Malla Reddy Institute of Technology and Science | Hyderabad, Telangana | 11/2020 – 06/2024 | CGPA: 7.04", body_text_style))
    
    Story.append(Paragraph("<b>Intermediate - MPC</b>", project_title_style))
    Story.append(Paragraph("Sri Vaishnavi Abhyaas Junior College | Guntur, AP | 06/2018 – 03/2022 | CGPA: 9.25", body_text_style))
    
    Story.append(Paragraph("<b>SSC</b>", project_title_style))
    Story.append(Paragraph("Ashara Sree Model High School | Adoni, AP | 06/2017 – 03/2018 | CGPA: 9.7", body_text_style))

    # Projects
    Story.append(Paragraph("<b>PROJECTS</b>", section_heading))
    Story.append(Paragraph("&bull; <b>Enabling Authorized Encrypted Search for Multi Authority Medical Databases:</b> A Website for easy and safe access of Medical Databases (02/2024 – 05/2024).", bullet_style))
    Story.append(Paragraph("&bull; <b>Determining Fake Statements Made by Public Figures using AI:</b> A Website to Determine Fake Statements using NLP models (08/2023 – 11/2023).", bullet_style))
    Story.append(Paragraph("&bull; <b>Restaurant website - EBT:</b> Constructed a static website for a restaurant (04/2023).", bullet_style))

    # Certificates
    Story.append(Paragraph("<b>CERTIFICATES & ACTIVITIES</b>", section_heading))
    Story.append(Paragraph("&bull; Complete A.I. & Machine Learning, Data Science Bootcamp – Udemy (08/2025–Present)", bullet_style))
    Story.append(Paragraph("&bull; Learning Python – LinkedIn (08/2025 – 10/2025)", bullet_style))
    Story.append(Paragraph("&bull; Deloitte Australia Data Analytics & Technology Job Simulations (Forage)", bullet_style))

    # Interests
    Story.append(Paragraph("<b>INTERESTS</b>", section_heading))
    Story.append(Paragraph("Cooking, playing games, Enhancing new Skills.", body_text_style))

    doc.build(Story)
    print(f"Resume generated successfully at {output_path}")

if __name__ == "__main__":
    out_path = os.path.join("public", "assets", "resume.pdf")
    create_resume(out_path)
