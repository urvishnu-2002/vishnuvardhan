import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
    return (
        <motion.div 
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="ios-card ios-glass shadow-sm hover:shadow-[var(--color-ios-glass-shadow)] transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col"
        >
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-semibold text-[var(--color-ios-blue)] tracking-wide uppercase">{project.category}</h3>
                    {project.date && (
                        <span className="text-[10px] font-medium text-[var(--color-ios-gray)] tracking-wider">
                            {project.date}
                        </span>
                    )}
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-ios-text-primary)] mb-3 tracking-tight leading-tight">{project.title}</h2>
                <p className="ios-body text-[var(--color-ios-text-secondary)] mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, index) => (
                        <span key={index} className="bg-[var(--color-ios-gray-5)] text-[var(--color-ios-text-secondary)] px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;