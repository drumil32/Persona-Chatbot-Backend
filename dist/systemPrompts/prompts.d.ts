export declare const hiteshChoudhary: {
    persona_identity: {
        name: string;
        role: string;
        tagline: string;
        mission: string;
        current_quote: string;
    };
    core_personality: {
        communication_style: string;
        teaching_philosophy: string;
        approach: string;
        humor: string;
        quality_focus: string;
    };
    signature_elements: {
        openings: {
            casual: string[];
            teaching: string[];
            motivational: string[];
        };
        catchphrases: string[];
        abbreviations: string;
        brand_emoji: string;
        hashtag: string;
        gratitude_expressions: string[];
    };
    technology_detection: {
        javascript: string[];
        react: string[];
        python: string[];
        backend: string[];
        frontend: string[];
        fullstack: string[];
        ai_ml: string[];
        devops: string[];
        data_science: string[];
        git: string[];
        general_coding: string[];
    };
    all_resources: {
        primary_platforms: {
            chaicode_website: string;
            chaicode_courses: string;
            official_website: string;
            udemy_profile: string;
        };
        social_media: {
            youtube_main: string;
            youtube_hindi: string;
            instagram: string;
            linkedin: string;
            twitter: string;
            github: string;
        };
        github_repos: {
            javascript: string;
            react: string;
            backend: string;
            python: string;
            git: string;
        };
    };
    current_courses: {
        active_cohorts: {
            name: string;
            price: string;
            tech: string[];
            status: string;
            link: string;
            description: string;
        }[];
    };
    dynamic_response_templates: {
        free_resource_intro: {
            youtube_mention: string;
            github_mention: string;
            challenge_mention: string;
        };
        course_recommendation: {
            beginner: string;
            intermediate: string;
            fullstack: string;
        };
        connection_invite: {
            instagram: string;
            linkedin: string;
            github: string;
        };
    };
    response_intelligence: {
        user_level_detection: {
            beginner_indicators: string[];
            intermediate_indicators: string[];
            advanced_indicators: string[];
        };
        query_type_detection: {
            simple_greeting: {
                triggers: string[];
                response_style: string;
                max_length: string;
                include_promotion: boolean;
            };
            learning_query: {
                triggers: string[];
                response_style: string;
                include_promotion: boolean;
                resource_priority: string[];
            };
            code_request: {
                triggers: string[];
                response_style: string;
                include_promotion: boolean;
                focus: string;
            };
            course_inquiry: {
                triggers: string[];
                response_style: string;
                include_promotion: boolean;
                priority: string;
            };
        };
        overwhelm_prevention: {
            max_courses_mentioned: number;
            max_social_links: number;
            max_github_repos: number;
            progressive_disclosure: boolean;
        };
    };
    dynamic_resource_mapping: {
        javascript: {
            youtube_series: string;
            github_repo: string;
            primary_course: string;
            beginner_course: string;
            udemy_option: string;
        };
        react: {
            youtube_series: string;
            github_repo: string;
            primary_course: string;
        };
        python: {
            youtube_series: string;
            github_repo: string;
            ai_course: string;
            data_course: string;
            udemy_option: string;
        };
        backend: {
            youtube_series: string;
            github_repo: string;
            primary_course: string;
        };
        fullstack: {
            primary_course: string;
            description: string;
        };
        devops: {
            primary_course: string;
        };
    };
    fallback_responses: {
        unsupported_technology: {
            acknowledge: string;
            redirect: string;
            general_advice: string;
            connect: string;
        };
    };
    response_behavior_rules: {
        never_give_direct_code: boolean;
        always_push_for_thinking: string;
        teaching_method: string;
        resource_promotion_strategy: string;
        community_building: string;
        authentic_persona: string;
    };
    example_dynamic_responses: {
        javascript_beginner: {
            user: string;
            response: string;
        };
        react_intermediate: {
            user: string;
            response: string;
        };
        simple_greeting: {
            user: string;
            response: string;
        };
    };
    "Don't": {
        marketing: {
            guidelines: {
                description: string;
                max_sentences: number;
                link_requirement: {
                    rule: string;
                    example: string;
                };
                frequency_limit: string;
            };
            rules: string[];
        };
        long_messages: {
            guidelines: {
                description: string;
                max_lines: number;
                style_guidance: string[];
            };
            rules: string[];
        };
        ai_identity: {
            description: string;
            avoid_phrases: string[];
        };
        irrelevant_content: {
            description: string;
        };
        language_style: {
            description: string;
            avoid_phrases: string[];
        };
        persona_breaking: {
            description: string;
        };
        overwhelming_responses: {
            description: string;
            rules: string[];
        };
        reinforce_repetition: {
            description: string;
            rules: string[];
        };
    };
    repetition_handling: {
        greeting_spam: {
            description: string;
            detection: {
                window_turns: number;
                min_repetitions: number;
                token_set: string[];
                normalize: string[];
            };
            response_policy: {
                include_promotion: boolean;
                max_length: string;
                cooldown_turns: number;
                on_detect: string;
            };
            example_responses: string[];
        };
        repeated_question: {
            description: string;
            detection: {
                window_turns: number;
                similarity_threshold: number;
                min_repetitions: number;
            };
            response_policy: {
                include_promotion: boolean;
                never_give_direct_code: boolean;
                structure: string[];
                max_length: string;
            };
            scripts: {
                first_repeat: string;
                second_repeat: string;
                third_plus: string;
            };
            example_responses: string[];
        };
    };
    training_examples: {
        user_input: string;
        expected_response: string;
        context: string;
    }[];
    hard_rules: {
        link_availability: {
            description: string;
            check_sources: string[];
            on_missing_link: {
                behavior: string;
                example_responses: string[];
            };
            enforcement: string;
        };
    };
};
//# sourceMappingURL=prompts.d.ts.map